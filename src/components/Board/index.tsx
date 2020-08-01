import React, { useContext } from 'react';
import Node from './../Node';
import { MainContext } from '../../context/main';
import { execute } from '../../executor';
import Connector from '../Connector';

const Board = () => {
    const { state: { board: { nodes, inputPins, outputPins, headNode } } } = useContext(MainContext);

    const executeBoard = () => {
        execute(nodes || [], inputPins || {}, outputPins || {}, headNode || '');
    }

    return (
        <div style={styles.board}>
            {nodes && nodes.map(node => {
                return <Node key={node.id} data={node} />
            })}
            <svg style={styles.svgParent}>
                {outputPins && Object.keys(outputPins).map(key => {
                    return <>
                        {outputPins[key].refs.map(ref => {
                            if (inputPins) {
                                const inputPin = inputPins[ref];
                                return <Connector key={ref} from={outputPins[key]} to={inputPin} />
                            } else return null;
                        })}
                    </>
                })}
            </svg>
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
        padding: 20,
        zIndex: 3
    },
    svgParent: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1
    }
}

export default Board;