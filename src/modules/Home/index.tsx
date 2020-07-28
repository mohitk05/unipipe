import React, { useContext } from 'react';
import ElementList from './../../components/ElementList';
import Board from './../../components/Board';
import { MainContext } from './../../context/main';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Home = () => {
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