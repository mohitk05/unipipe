import { getProcessor } from './processor';
import { v4 as uuidv4 } from 'uuid';
import { NodeType } from '../context/main';

export type ElementType = {
	id: string;
	key: string;
	type: string;
	name: string;
	description?: string;
	processor?: string;
	pinMapping: InputOutput;
	initialData?: any;
};

type PinMapping = {
	[key: string]: InputOutput;
};

type InputOutput = {
	inputs: {
		type: 'in';
		name: string;
		label: string;
	}[];
	outputs: {
		type: 'out';
		label: string;
		name: string;
	}[];
};

export const pinMapping: PinMapping = {
	add: {
		inputs: [
			{
				type: 'in',
				label: 'input1',
				name: 'input1',
			},
			{
				type: 'in',
				label: 'input2',
				name: 'input2',
			},
		],
		outputs: [
			{
				type: 'out',
				label: 'sum',
				name: 'sum',
			},
		],
	},
	square: {
		inputs: [
			{
				type: 'in',
				label: 'input',
				name: 'input',
			},
		],
		outputs: [
			{
				type: 'out',
				label: 'square',
				name: 'square',
			},
		],
	},
	factorial: {
		inputs: [
			{
				type: 'in',
				label: 'input',
				name: 'input',
			},
		],
		outputs: [
			{
				type: 'out',
				label: 'factorial',
				name: 'factorial',
			},
		],
	},
	conditional: {
		inputs: [
			{
				type: 'in',
				label: 'input1',
				name: 'input1',
			},
			{
				type: 'in',
				label: 'input2',
				name: 'input2',
			},
		],
		outputs: [
			{
				type: 'out',
				label: 'true',
				name: 'true',
			},
			{
				type: 'out',
				label: 'false',
				name: 'false',
			},
		],
	},
	constant: {
		inputs: [],
		outputs: [
			{
				type: 'out',
				label: 'constant',
				name: 'constant',
			},
		],
	},
	regex: {
		inputs: [
			{
				type: 'in',
				label: 'input',
				name: 'input',
			},
		],
		outputs: [
			{
				type: 'out',
				label: 'matches',
				name: 'matches',
			},
		],
	},
	console: {
		inputs: [
			{
				type: 'in',
				label: 'input',
				name: 'input',
			},
		],
		outputs: [],
	},
	display: {
		inputs: [
			{
				type: 'in',
				label: 'input',
				name: 'input',
			},
		],
		outputs: [],
	},
};

export const elements: {
	key: string;
	type: string;
	name: string;
	processor?: string;
	pinMapping: InputOutput;
	initialData?: (node: NodeType) => object;
}[] = [
	{
		key: 'add',
		type: 'add',
		name: 'Add',
		processor: getProcessor('add'),
		pinMapping: pinMapping['add'],
	},
	{
		key: 'square',
		type: 'square',
		name: 'Square',
		processor: getProcessor('square'),
		pinMapping: pinMapping['square'],
	},
	{
		key: 'factorial',
		type: 'factorial',
		name: 'Factorial',
		processor: getProcessor('factorial'),
		pinMapping: pinMapping['factorial'],
	},
	{
		key: 'conditional',
		type: 'conditional',
		name: 'Conditional',
		processor: getProcessor('conditional'),
		pinMapping: pinMapping['conditional'],
	},
	{
		key: 'constant',
		type: 'constant',
		name: 'Constant',
		initialData: () => {
			return { value: 4 };
		},
		processor: getProcessor('constant'),
		pinMapping: pinMapping['constant'],
	},
	{
		key: 'regex',
		type: 'regex',
		name: 'Regex Match',
		processor: getProcessor('regex'),
		initialData: () => {
			return {
				regex: 'hey',
				flags: 'g',
			};
		},
		pinMapping: pinMapping['regex'],
	},
	{
		key: 'console',
		type: 'sink',
		name: 'Console',
		processor: getProcessor('console'),
		pinMapping: pinMapping['console'],
	},
	{
		key: 'display',
		type: 'sink',
		name: 'Display',
		processor: getProcessor('display'),
		pinMapping: pinMapping['display'],
		initialData: (node: NodeType) => {
			return {
				node: node.id,
			};
		},
	},
];

const init = (): { [id: string]: ElementType } => {
	const elementMap: { [key: string]: ElementType } = {};

	elements.forEach((el) => {
		let id = uuidv4();
		elementMap[id] = {
			id,
			...el,
			initialData: el.initialData && el.initialData.toString(),
		};
	});

	localStorage.setItem('elements', JSON.stringify(elementMap));

	return elementMap;
};

export const getAllElements = (): { [id: string]: ElementType } => {
	const elements = localStorage.getItem('elements');
	if (elements) {
		return JSON.parse(elements);
	} else {
		const elementMap = init();
		return elementMap;
	}
};

export const getElement = (type: string): ElementType => {
	const elements = localStorage.getItem('elements');
	if (elements) {
		return JSON.parse(elements)[type];
	} else {
		const elementMap = init();
		return elementMap[type];
	}
};

export const getElementProcessor = (type: string) => {
	return getElement(type).processor;
};
