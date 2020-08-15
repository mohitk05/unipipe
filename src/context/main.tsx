import * as React from 'react';

// export type PinType = {
//     id: string;
//     type: 'in' | 'out';
//     name: string,
//     schema?: any, // explore this later
//     ref?: string | null // referring Pin id
// }

export type InPinType = {
    id: string;
    node: string;
    ref: string | null;
    type: "in";
    name: string;
    label: string;
    position?: {
        x: number;
        y: number;
    }
}

export type OutPinType = {
    id: string;
    node: string;
    type: "out";
    label: string;
    name: string;
    refs: string[],
    position?: {
        x: number;
        y: number;
    }
}

export type NodeType = {
    id: string;
    type: string;
    inputs: string[]; // Pins
    outputs: string[]; // Pins
    data?: any,
    position?: {
        x: number;
        y: number;
    }
}

export type BoardState = {
    nodes?: NodeType[];
    inputPins?: {
        [key: string]: InPinType
    };
    outputPins?: {
        [key: string]: OutPinType
    }
    selectedPin?: string,
    headNode?: string
}

export type StoreStateType = {
    board: BoardState
}

export const initialState: StoreStateType = {
    board: {
        nodes: [],
        inputPins: {},
        outputPins: {}
    }
}

export const MainContext = React.createContext<{
    state: StoreStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
})