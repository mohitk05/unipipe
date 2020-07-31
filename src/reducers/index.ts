import { StoreStateType, BoardState } from './../context/main';
import { BoardActions } from '../actions/board';
import cloneDeep from 'lodash/cloneDeep';

export const boardReducer = (state: BoardState, action: BoardActions) => {
	let stateClone: BoardState;
	switch (action.type) {
		case 'SET_ENGINE':
			stateClone = cloneDeep(state);
			stateClone.engine = action.data.engine;
			return stateClone;
		case 'CREATE_NODE':
			stateClone = cloneDeep(state);
			if (!state.nodes?.length) {
				stateClone.headNode = action.data.node.id;
			}
			stateClone.nodes = [...(state.nodes || []), action.data.node];
			return stateClone;
		case 'ADD_INPUT_PINS':
			stateClone = cloneDeep(state);
			action.data.pins.forEach((pin) => {
				stateClone.inputPins && (stateClone.inputPins[pin.id] = pin);
			});
			return stateClone;
		case 'ADD_OUTPUT_PINS':
			stateClone = cloneDeep(state);
			action.data.pins.forEach((pin) => {
				stateClone.outputPins && (stateClone.outputPins[pin.id] = pin);
			});
			return stateClone;
		case 'CONNECT_PINS':
			stateClone = cloneDeep(state);
			stateClone.inputPins &&
				(stateClone.inputPins[action.data.input].ref =
					action.data.output);
			stateClone.outputPins &&
				stateClone.outputPins[action.data.output].refs.push(
					action.data.input
				);
			return stateClone;
		case 'SELECT_PIN':
			stateClone = cloneDeep(state);
			stateClone.selectedPin = action.data.pin;
			return stateClone;
		case 'RESET_SELECTED_PIN':
			stateClone = cloneDeep(state);
			delete stateClone.selectedPin;
			return stateClone;
		case 'UPDATE_INPUT_PIN_COORDINATES':
			stateClone = cloneDeep(state);
			stateClone.inputPins &&
				(stateClone.inputPins[action.data.id].coordinates =
					action.data.coordinates);
			return stateClone;
		case 'UPDATE_OUTPUT_PIN_COORDINATES':
			stateClone = cloneDeep(state);
			stateClone.outputPins &&
				(stateClone.outputPins[action.data.id].coordinates =
					action.data.coordinates);
			return stateClone;
		default:
			return state;
	}
};

export const main = (state: StoreStateType, action: BoardActions) => ({
	board: boardReducer(state.board, action),
});
