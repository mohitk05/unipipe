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
    const { dispatch } = useContext(MainContext);
    const nodeRef = useRef<HTMLDivElement>(null);
    const mousePosRef = useRef({ x: 0, y: 0 });

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
        style={{ ...getStyles(coordinates.x, coordinates.y, false) }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
    >
        <div>
            {data.inputs.map(input => {
                return <Pin key={input} pin={input} nodeCoordinates={coordinates} />
            })}
        </div>
        <p><b>{element.name}</b></p>
        <div>
            {data.outputs.map(output => {
                return <Pin key={output} pin={output} nodeCoordinates={coordinates} />
            })}
        </div>
    </div>
}

const getStyles = (
    left: number,
    top: number,
    isDragging: boolean,
): React.CSSProperties => {
    return {
        position: 'absolute',
        left,
        top,
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : '',
    }
}

export default Node;