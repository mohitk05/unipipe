import React, { useContext, useEffect } from 'react';
import Node from './../Node';
import { MainContext } from '../../context/main';
import Connector from '../Connector';
import Executor from 'worker-loader!../../executor/executor.worker.ts';
import { getAllElements } from '../../util/element';
/* eslint import/no-webpack-loader-syntax: off */
const executor = new Executor();

const Board = () => {
    const { state: { board: { nodes, inputPins, outputPins, headNode } }, dispatch } = useContext(MainContext);

    useEffect(() => {
        executor.addEventListener('message', (e: MessageEvent) => {
            const data: { type: string; node: string; update: object } = e.data;
            switch (data.type) {
                case 'update_node':
                    dispatch({
                        type: 'UPDATE_NODE_DATA_PARTIAL',
                        data: {
                            node: data.node,
                            update: data.update
                        }
                    })
                    break;
                default: return;
            }
        })
    }, [dispatch])

    const executeBoard = () => {
        executor.postMessage({ action: 'execute', data: { nodes: nodes || [], inputPins: inputPins || {}, outputPins: outputPins || {}, elements: getAllElements(), headNode: headNode || '' } });
    }

    return (
        <div style={styles.board}>
            <h1 style={{ marginLeft: 10 }}>unipipe</h1>
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