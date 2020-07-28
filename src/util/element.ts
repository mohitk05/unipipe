import { getProcessor } from './processor';
import { v4 as uuidv4 } from 'uuid';

export type ElementType = {
	id: string;
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
};

export const elements: {
	type: string;
	name: string;
	processor?: string;
	pinMapping: InputOutput;
	initialData?: any;
}[] = [
	{
		type: 'add',
		name: 'Add',
		processor: getProcessor('add'),
		pinMapping: pinMapping['add'],
	},
	{
		type: 'square',
		name: 'Square',
		processor: getProcessor('square'),
		pinMapping: pinMapping['square'],
	},
	{
		type: 'constant',
		name: 'Constant',
		initialData: {
			value: 4,
		},
		pinMapping: pinMapping['constant'],
	},
	{
		type: 'sink',
		name: 'Console',
		processor: getProcessor('console'),
		pinMapping: pinMapping['console'],
	},
	{
		type: 'sink',
		name: 'Display',
		processor: getProcessor('display'),
		pinMapping: pinMapping['display'],
	},
];

const elementMap: { [key: string]: ElementType } = {};

elements.forEach((el) => {
	let id = uuidv4();
	elementMap[id] = {
		id,
		...el,
	};
});

export const getAllElements = () => {
	return elementMap;
};

export const getElement = (type: string) => {
	return elementMap[type];
};

export const getElementProcessor = (type: string) => {
	return getElement(type).processor;
};
