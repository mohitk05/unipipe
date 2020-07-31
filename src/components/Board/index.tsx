import React, { useContext } from 'react';
import { MainContext } from '../../context/main';
import './index.css';
import {
    CanvasWidget
} from '@projectstorm/react-canvas-core';
import { parseAndExecute } from '../../executor/v2';

const Board = () => {
    const { state: { board: { engine } } } = useContext(MainContext);

    const executeBoard = () => {
        engine && parseAndExecute(engine)
    }

    return (
        <div style={styles.board}>
            {engine && <CanvasWidget engine={engine} className="main-canvas" />}
            <div style={styles.executeMenu}>
                <button onClick={executeBoard}>Execute</button>
            </div>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    board: {
        padding: 16,
        width: '100%',
        position: 'relative'
    },
    executeMenu: {
        top: 20,
        right: 20,
        background: 'white',
        position: 'absolute',
        padding: 20
    }
}

export default Board;