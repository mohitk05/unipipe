import { StoreStateType, BoardState, NodeType } from "./../context/main";
import { BoardActions } from "../actions/board";
import * as lodash from "lodash";

const cloneDeep = lodash.cloneDeep;

export const boardReducer = (state: BoardState, action: BoardActions) => {
    let stateClone: BoardState;
    let tempNode: NodeType | undefined;
    let tempIndex: number | undefined;
    switch (action.type) {
        case "CREATE_NODE":
            stateClone = cloneDeep(state);
            if (!state.nodes?.length) {
                stateClone.headNode = action.data.node.id;
            }
            stateClone.nodes = [...(state.nodes || []), action.data.node];
            return stateClone;
        case "ADD_INPUT_PINS":
            stateClone = cloneDeep(state);
            action.data.pins.forEach((pin) => {
                stateClone.inputPins && (stateClone.inputPins[pin.id] = pin);
            });
            return stateClone;
        case "ADD_OUTPUT_PINS":
            stateClone = cloneDeep(state);
            action.data.pins.forEach((pin) => {
                stateClone.outputPins && (stateClone.outputPins[pin.id] = pin);
            });
            return stateClone;
        case "CONNECT_PINS":
            stateClone = cloneDeep(state);
            stateClone.inputPins &&
                (stateClone.inputPins[action.data.input].ref =
                    action.data.output);
            stateClone.outputPins &&
                stateClone.outputPins[action.data.output].refs.push(
                    action.data.input
                );
            return stateClone;
        case "DISCONNECT_PINS":
            stateClone = cloneDeep(state);
            stateClone.inputPins &&
                (stateClone.inputPins[action.data.input].ref = null);
            tempIndex =
                stateClone.outputPins &&
                stateClone.outputPins[action.data.output].refs.findIndex(
                    (ref: string) => ref === action.data.input
                );
            if (tempIndex !== undefined && tempIndex > -1) {
                stateClone.outputPins &&
                    stateClone.outputPins[action.data.output].refs.splice(
                        tempIndex,
                        1
                    );
            }
            return stateClone;
        case "SELECT_PIN":
            stateClone = cloneDeep(state);
            stateClone.selectedPin = action.data.pin;
            return stateClone;
        case "RESET_SELECTED_PIN":
            stateClone = cloneDeep(state);
            delete stateClone.selectedPin;
            return stateClone;
        case "UPDATE_INPUT_PIN_POSITION":
            stateClone = cloneDeep(state);
            stateClone.inputPins &&
                (stateClone.inputPins[action.data.pin].position = {
                    x: action.data.x,
                    y: action.data.y,
                });
            return stateClone;
        case "UPDATE_OUTPUT_PIN_POSITION":
            stateClone = cloneDeep(state);
            stateClone.outputPins &&
                (stateClone.outputPins[action.data.pin].position = {
                    x: action.data.x,
                    y: action.data.y,
                });
            return stateClone;
        case "UPDATE_NODE_POSITION":
            stateClone = cloneDeep(state);
            tempNode =
                stateClone.nodes &&
                stateClone.nodes.find((node) => node.id === action.data.node);
            if (tempNode) {
                tempNode.position = { x: action.data.x, y: action.data.y };
            }
            return stateClone;
        case "UPDATE_NODE_DATA":
            stateClone = cloneDeep(state);
            tempNode =
                stateClone.nodes &&
                stateClone.nodes.find((node) => node.id === action.data.node);
            if (tempNode) {
                tempNode.data = action.data.newData;
            }
            return stateClone;
        case "UPDATE_NODE_DATA_PARTIAL":
            stateClone = cloneDeep(state);
            tempNode =
                stateClone.nodes &&
                stateClone.nodes.find((node) => node.id === action.data.node);
            if (tempNode) {
                tempNode.data = tempNode.data
                    ? { ...tempNode.data, ...action.data.update }
                    : action.data.update;
            }
            return stateClone;
        case "LOAD_RECIPE":
            return action.data.state;
        case "DELETE_NODE":
            stateClone = cloneDeep(state);
            tempIndex = stateClone.nodes?.findIndex((node: NodeType) => {
                return node.id === action.data.node;
            });
            if (stateClone.nodes && tempIndex !== undefined && tempIndex > -1) {
                tempNode = stateClone.nodes[tempIndex];
                tempNode.inputs.forEach((input: string) => {
                    stateClone.inputPins && delete stateClone.inputPins[input];
                });
                tempNode.outputs.forEach((output: string) => {
                    stateClone.outputPins &&
                        delete stateClone.outputPins[output];
                });
                stateClone.nodes?.splice(tempIndex, 1);
            }
            return stateClone;
        default:
            return state;
    }
};

export const main = (state: StoreStateType, action: BoardActions) => {
    const newState = {
        board: boardReducer(state.board, action),
    };

    localStorage.setItem("store_state", JSON.stringify(newState));

    return newState;
};
