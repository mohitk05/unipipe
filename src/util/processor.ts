const processors: { [key: string]: (param: any) => any } = {
	add: ({ input1, input2 }) => input1 + input2,
	square: ({ input }) => input * input,
	constant: ({ node }) => node.data.value,
	regex: ({
		input,
		node: {
			data: { regex, flags },
		},
	}): string[] => {
		if (Array.isArray(input)) {
			return input.filter((i) => new RegExp(regex, flags).test(i));
		} else if (typeof input === 'string') {
			return input.match(new RegExp(regex, flags)) || [];
		} else {
			return [];
		}
	},
	console: ({ input, node, ctx }) => {
		ctx.postMessage({
			type: 'update_node',
			node: node.id,
			update: {
				value: input,
			},
		});
		console.log('Result:', input);
	},
	display: ({ input, node, ctx }) => {
		ctx.postMessage({
			type: 'update_node',
			node: node.id,
			update: {
				value: input,
			},
		});
		console.log(input);
	},
};

export const getProcessor = (type: string) => {
	return processors[type].toString();
};
