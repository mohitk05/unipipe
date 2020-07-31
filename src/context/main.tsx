import React, { createContext } from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams';

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
    coordinates?: {
        x: number;
        y: number;
        z?: number;
    };
}

export type OutPinType = {
    id: string;
    node: string;
    type: "out";
    label: string;
    name: string;
    refs: string[];
    coordinates?: {
        x: number;
        y: number;
        z?: number;
    };
}

export type NodeType = {
    id: string;
    type: string;
    inputs: string[]; // Pins
    outputs: string[]; // Pins
    data?: any
}

export type BoardState = {
    engine: DiagramEngine | null;
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
        engine: null,
        nodes: [],
        inputPins: {},
        outputPins: {}
    }
}

export const MainContext = createContext<{
    state: StoreStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
})