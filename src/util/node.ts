import { v4 as uuidv4 } from 'uuid';
import { NodeType, InPinType, OutPinType } from './../context/main';
import { getElement } from './element';

export const createNode = (type: string) => {
	const nodeId = uuidv4();
	const element = getElement(type);
	const { inputs, outputs } = element.pinMapping;
	const inputInstances: InPinType[] = inputs.map((i) => ({
		...i,
		id: uuidv4(),
		node: nodeId,
		ref: null,
	}));
	const outputInstances: OutPinType[] = outputs.map((o) => ({
		...o,
		id: uuidv4(),
		node: nodeId,
		refs: [],
	}));
	let node: NodeType = {
		id: nodeId,
		type,
		inputs: inputInstances.map((i) => i.id),
		outputs: outputInstances.map((o) => o.id),
	};

	if (element.initialData) {
		node.data = eval(`(${element.initialData})(node)`);
	}
	return {
		node,
		pins: [...inputInstances, ...outputInstances],
		inputPins: inputInstances,
		outputPins: outputInstances,
	};
};
