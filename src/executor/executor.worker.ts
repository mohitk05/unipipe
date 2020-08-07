import { NodeType, InPinType, OutPinType } from '../context/main';
import { ElementType } from '../util/element';

const ctx: Worker = self as any;

/*
Algorithm
current: current node in the process
- If current node is sink or it has no outputs, end the process.
- If not, then
    - Get data from all inputs for current node
        - If the input node has data != null, then get that data, or else subscribe to their data
    - Execute the processor for the current node with input values in scope.
      The processor would always return a promise which upon completion will return the data.
    - Set the resulting data to the node data (build something like computed data, where output pin can take only part of data too.)
    - Go to next node connected to the output.
        - For multiple nodes as output, proceed parallely.
        - Start recursive executions for each branch.
    - In each case, set current to the next node, call executeRecursive() with the new current
*/
let globalElements: { [key: string]: ElementType } = {};

class ExecutorNode {
	node: NodeType;
	subscribers: Function[];
	data: any | null;
	isExecuting: boolean;

	constructor(node: NodeType) {
		this.node = node;
		this.subscribers = [];
		this.isExecuting = false;
		this.data = null;
	}

	getNode(): NodeType {
		return this.node;
	}

	getData(): Promise<any> {
		return new Promise((resolve, reject) => {
			if (this.data !== null) {
				return resolve(this.data);
			} else if (this.isExecuting) {
				let timedOut = false;
				const timeout = setTimeout(() => {
					timedOut = true;
					reject('Input node execution timed out.');
				}, 20000);
				this.subscribers.push(() => {
					if (!timedOut) {
						clearTimeout(timeout);
						resolve(this.data);
					}
				});
			} else {
				// reject(
				// 	`The input node isn't responding. Rerun the process to try again.`
				// );
			}
		});
	}

	execute(scopeData: any) {
		const processor = globalElements[this.node.type].processor;
		this.isExecuting = true;
		return new Promise(async (res, rej) => {
			try {
				const data = await eval(
					`(${processor})({ ...scopeData, ctx, node: this.node })`
				);
				this.data = data;
				this.subscribers.forEach((s) => s());
				res();
			} catch (e) {
				rej(
					`Error executing node - ${
						globalElements[this.node.type].type
					} (${this.node.id}). Message: ${e.message}`
				);
			} finally {
				this.isExecuting = false;
			}
		});
	}
}

const execute = (
	nodes: NodeType[],
	inputPins: { [key: string]: InPinType },
	outputPins: { [key: string]: OutPinType },
	elements: { [key: string]: ElementType }
	// head: string
) => {
	globalElements = elements;
	let nodeMap: { [key: string]: ExecutorNode } = {};
	nodes.forEach((node) => {
		nodeMap[node.id] = new ExecutorNode(node);
	});
	const executeRecursive = async (current: string) => {
		const currentNode = nodeMap[current];
		const inputs = currentNode.getNode().inputs;

		let inputPromises: Promise<any>[] = [];

		inputs.forEach((input) => {
			const inputPin = inputPins[input];
			if (inputPin.ref) {
				const inputRefPin = outputPins[inputPin.ref];
				const inputNode = nodeMap[inputRefPin.node];
				inputPromises.push(
					new Promise((res, rej) => {
						inputNode
							.getData()
							.then((data) => {
								res({ data, name: inputPin.name });
							})
							.catch(rej);
					})
				);
			}
		});

		await Promise.all(inputPromises)
			.then((results) => {
				let scopeData: { [key: string]: any } = {};
				results.forEach((res) => {
					scopeData[res.name] = res.data;
				});
				currentNode
					.execute(scopeData)
					.then(() => {
						if (
							currentNode.getNode().outputs.length &&
							globalElements[currentNode.getNode().type].type !==
								'sink' &&
							currentNode.getNode().outputs.length
						) {
							currentNode.getNode().outputs.forEach((out) => {
								const outPinRefs = outputPins[out].refs;
								outPinRefs.forEach((oRef) => {
									const nextNode = inputPins[oRef].node;
									executeRecursive(nextNode);
								});
							});
						}
					})
					.catch((e) => {
						throw new Error(e);
					});
			})
			.catch((e) => {
				throw new Error(e);
			});
	};

	const headNode = findHeadNode(nodes, inputPins, outputPins);
	executeRecursive(headNode);
};

const findHeadNode = (
	nodes: NodeType[],
	inputPins: { [id: string]: InPinType },
	outputPins: { [id: string]: OutPinType }
): string => {
	/* Algorithm: Find all nodes which do not have an input pin,
		for all such pins, filter those whose outputs have only self as inputs
	*/
	const nodeMap: { [id: string]: NodeType } = {};
	nodes.forEach((node) => {
		nodeMap[node.id] = node;
	});
	const nodesWithoutInputs = nodes.filter((node: NodeType) => {
		return !node.inputs.length;
	});

	const headNodes = nodesWithoutInputs.filter((node: NodeType) => {
		let pass = true;
		node.outputs.forEach((out) => {
			if (pass) {
				let outPin = outputPins[out];
				outPin.refs.forEach((ref) => {
					if (pass) {
						let refInputPin = inputPins[ref];
						let refNode: NodeType = nodeMap[refInputPin.node];
						let refNodeInputPins = refNode.inputs.map(
							(i) => inputPins[i]
						);

						refNodeInputPins.forEach((refNodeInputPin) => {
							if (
								pass &&
								refNodeInputPin.ref &&
								refNodeInputPin.ref !== out
							) {
								pass = false;
							}
						});
					}
				});
			}
		});

		return pass;
	});

	// Simply return the first node without any inputs.
	return nodesWithoutInputs[0].id;
};

ctx.addEventListener('message', (e: MessageEvent) => {
	const data: { action: string; data: any } = e.data;
	const action = data.action;

	switch (action) {
		case 'execute':
			execute(
				data.data.nodes,
				data.data.inputPins,
				data.data.outputPins,
				data.data.elements
				// data.data.headNode
			);
			return;
		default:
			return;
	}
});
