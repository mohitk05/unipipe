const processors: { [key: string]: string } = {
	add: `({input1, input2}) => input1 + input2`,
	square: `({ input }) => input*input`,
	constant: `() => 4`,
	console: `({ input }) => console.log('Result:', input)`,
};

export const getProcessor = (type: string) => {
	return processors[type];
};
