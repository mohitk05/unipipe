import React, { useContext, useEffect, useState } from 'react';
import ElementList from './../../components/ElementList';
import Board from './../../components/Board';
import { MainContext } from './../../context/main';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import createEngine, {
    DiagramModel, DefaultDiagramState
} from '@projectstorm/react-diagrams';

const Home = () => {
    const { dispatch } = useContext(MainContext);

    useEffect(() => {
        const savedModel = localStorage.getItem('unipipe_model');
        const engine = createEngine();
        const state = engine.getStateMachine().getCurrentState();
        if (state instanceof DefaultDiagramState) {
            state.dragNewLink.config.allowLooseLinks = false;
        }
        const model = new DiagramModel();
        if (savedModel) model.deserializeModel(JSON.parse(savedModel), engine);
        engine.setModel(model);
        dispatch({
            type: 'SET_ENGINE',
            data: {
                engine
            }
        })
    }, [])
    return <div style={{
        display: 'flex',
        height: '100vh'
    }}>
        <ElementList />
        <DndProvider backend={HTML5Backend}>
            <Board />
        </DndProvider>
    </div>
}

export default Home;