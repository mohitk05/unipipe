import { NodeType, InPinType, OutPinType } from './../context/main';
export type BoardActions =
	| {
			type: 'CREATE_NODE';
			data: {
				node: NodeType;
			};
	  }
	| {
			type: 'DELETE_NODE';
			data: {
				id: string;
			};
	  }
	| {
			type: 'ADD_INPUT_PINS';
			data: {
				pins: InPinType[];
			};
	  }
	| {
			type: 'ADD_OUTPUT_PINS';
			data: {
				pins: OutPinType[];
			};
	  }
	| {
			type: 'SELECT_PIN';
			data: {
				pin: string;
			};
	  }
	| {
			type: 'RESET_SELECTED_PIN';
	  }
	| {
			type: 'CONNECT_PINS';
			data: {
				input: string;
				output: string;
			};
	  };
