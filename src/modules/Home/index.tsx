import React from 'react';
import ElementList from './../../components/ElementList';
import Board from './../../components/Board';

const Home = () => {
    return <div style={{
        display: 'flex',
        height: '100vh'
    }}>
        <ElementList />
        <Board />
    </div>
}

export default Home;