import { NodeType, InPinType, OutPinType } from '../context/main';
import { getElementProcessor, getElement } from '../util/element';

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

class ExecutorNode {
	node: NodeType;
	subscribers: Function[];
	data: any | null;
	isExecuting: boolean;

	constructor(node: NodeType) {
		this.node = node;
		this.subscribers = [];
		this.isExecuting = false;
		if (getElement(node.type).type === 'constant') {
			this.data = node.data.value;
		} else {
			this.data = null;
		}
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
		const config = this.node.data;
		const processor = getElementProcessor(this.node.type);
		this.isExecuting = true;
		return new Promise(async (res, rej) => {
			try {
				const data = await eval(
					`(${processor})({ ...scopeData, config })`
				);
				this.data = data;
				this.subscribers.forEach((s) => s());
				res();
			} catch (e) {
				rej(
					`Error executing node - ${
						getElement(this.node.type).type
					} (${this.node.id}). Message: ${e.message}`
				);
			} finally {
				this.isExecuting = false;
			}
		});
	}
}

export const execute = (
	nodes: NodeType[],
	inputPins: { [key: string]: InPinType },
	outputPins: { [key: string]: OutPinType },
	head: string
) => {
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
							getElement(currentNode.getNode().type).type !==
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

	executeRecursive(head);
};
