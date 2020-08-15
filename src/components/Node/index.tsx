import React, { useState, useRef, useContext } from 'react';
import Pin from './../Pin';
import { NodeType, MainContext } from '../../context/main';
import './index.css';
import { getElement } from '../../util/element';

type NodeProps = {
    data: NodeType
}

const Node = ({ data }: NodeProps) => {
    const [coordinates, setCoordinates] = useState(data.position || { x: 170, y: 20 });
    const [dataModalOpen, setDataModalOpen] = useState(false);
    const [modalData, setModalData] = useState(data.data ? JSON.stringify(data.data, null, 4) : '');
    const { state: { board: { inputPins, outputPins } }, dispatch } = useContext(MainContext);
    const nodeRef = useRef<HTMLDivElement>(null);
    const mousePosRef = useRef({ x: 0, y: 0 });

    const openModal = () => {
        setDataModalOpen(true);
    }

    const closeModal = () => {
        setDataModalOpen(false);
    }

    const onClickModalInner = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    const updateModalData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setModalData(e.target.value);
    }

    const saveUpdatedData = () => {
        try {
            let updatedData = JSON.parse(modalData);
            dispatch({
                type: 'UPDATE_NODE_DATA',
                data: {
                    node: data.id,
                    newData: updatedData
                }
            })
            closeModal();
        } catch {
            console.log('Invalid JSON structure, cannot save.')
        }
    }

    const deleteNode = () => {
        // 1. Clear references of input and output pins from connected nodes
        // 2. Delete all pins
        // 3. Delete node
        data.inputs.forEach((input: string) => {
            if (inputPins && inputPins[input].ref) {
                dispatch({
                    type: 'DISCONNECT_PINS',
                    data: {
                        input,
                        output: inputPins ? inputPins[input].ref : ''
                    }
                })
            }
        })
        data.outputs.forEach((output: string) => {
            outputPins && outputPins[output].refs.forEach((ref: string) => {
                dispatch({
                    type: 'DISCONNECT_PINS',
                    data: {
                        input: ref,
                        output
                    }
                })
            })
        })
        dispatch({
            type: 'DELETE_NODE',
            data: {
                node: data.id
            }
        })
    }

    const moveNode = (e: MouseEvent) => {
        e.preventDefault();
        const diffx = e.clientX - mousePosRef.current.x;
        const diffy = e.clientY - mousePosRef.current.y;
        mousePosRef.current = { x: e.clientX, y: e.clientY };
        setCoordinates(({ x, y }) => {
            return {
                x: x + diffx,
                y: y + diffy
            }
        })

    }

    const onMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        if (nodeRef.current) {
            document.onmousemove = moveNode;
            mousePosRef.current = { x: e.clientX, y: e.clientY };
        }
    }

    const onMouseUp = () => {
        document.onmousemove = null;
        dispatch({
            type: 'UPDATE_NODE_POSITION',
            data: {
                node: data.id,
                x: coordinates.x,
                y: coordinates.y
            }
        })
    }

    const element = getElement(data.type);

    return <div
        ref={nodeRef}
        className="nodeContainer"
        style={{ ...getStyles(coordinates.x, coordinates.y, dataModalOpen) }}
    >
        <div
            style={{ zIndex: 1 }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
            <p style={{ textAlign: 'center', margin: '10px 0 0' }}><b>{element.name}</b></p>
            <div className="top">
                {element.key === 'constant' ? <div style={{ border: '2px solid #ccc', padding: 5, fontFamily: 'monospace' }}>
                    <span>{data.data.value}</span>
                </div> : null}
                <div>
                    {data.inputs.map(input => {
                        return <Pin key={input} pin={input} nodeCoordinates={coordinates} />
                    })}
                </div>
                <div>
                    {data.outputs.map(output => {
                        return <Pin key={output} pin={output} nodeCoordinates={coordinates} />
                    })}
                </div>
                {element.key === 'display' ? <div style={{ border: '2px solid #ccc', padding: 5 }}>
                    <b>{data.data.value || 'Value'}</b>
                </div> : null}
            </div>
            <div className="bottom">
                <button onClick={openModal}>Data</button>
                <button onClick={deleteNode}>Delete</button>
            </div>
        </div>
        {dataModalOpen ? <div style={styles.modal} onClick={closeModal}>
            <div style={styles.modalInner} onClick={onClickModalInner}>
                <h1>Edit node - {element.name}</h1>
                <textarea style={styles.inputArea} value={modalData} onChange={updateModalData} />
                <button onClick={saveUpdatedData}>Save</button>
            </div>
        </div> : null}
    </div>
}

const getStyles = (
    left: number,
    top: number,
    modalOpen: boolean,
): React.CSSProperties => {
    return {
        position: 'absolute',
        left,
        top,
        zIndex: modalOpen ? 4 : 2
    }
}

const styles = {
    modal: {
        position: 'fixed' as 'fixed',
        left: 0,
        top: 0,
        background: 'rgba(0,0,0,0.4)',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    modalInner: {
        width: 500,
        background: 'white',
        borderRadius: 4,
        padding: 16
    },
    inputArea: {
        fontFamily: 'Menlo, monospace',
        width: '100%',
        display: 'block',
        height: 300,
        marginBottom: 10
    }
}

export default Node;