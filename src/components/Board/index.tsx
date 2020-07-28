import React, { useContext } from 'react';
import Node from './../Node';
import { MainContext } from '../../context/main';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { execute } from '../../executor';

const Board = () => {
    const { state: { board: { nodes, inputPins, outputPins, headNode } } } = useContext(MainContext);

    const onDrop = (item: { id: string, type: string }, monitor: DropTargetMonitor) => {
        return {
            delta: monitor.getDifferenceFromInitialOffset()
        }
    }

    const [collectedProps, drop] = useDrop({
        accept: 'node',
        drop: onDrop
    })

    const executeBoard = () => {
        execute(nodes || [], inputPins || {}, outputPins || {}, headNode || '');
    }

    return (
        <div ref={drop} style={styles.board}>
            {nodes && nodes.map(node => {
                return <Node key={node.id} data={node} />
            })}
            <div style={styles.executeMenu}>
                <button onClick={executeBoard}>Execute</button>
            </div>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    board: {
        padding: 16,
        width: '100%'
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