import React, { useState, useLayoutEffect, useEffect } from 'react';
import Pin from './../Pin';
import { NodeType } from '../../context/main';
import { useDrag, DragSourceMonitor } from 'react-dnd'
import './index.css';
import { getElement } from '../../util/element';

type NodeProps = {
    data: NodeType
}

const Node = ({ data }: NodeProps) => {
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

    const onEnd = (item: { id: string, type: string } | undefined, monitor: DragSourceMonitor) => {
        if (monitor.didDrop()) {
            const delta = monitor.getDropResult().delta
            if (delta) {
                let left = Math.round(coordinates.x + delta.x)
                let top = Math.round(coordinates.y + delta.y)
                const [x, y] = snapToGrid(left, top)
                setCoordinates({
                    x,
                    y
                })
            }
        }
    }

    const [{ isDragging }, drag] = useDrag({
        item: {
            id: data.id,
            type: 'node'
        },
        end: onEnd,
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging()
        }),
    })

    const element = getElement(data.type);

    return <div ref={drag} className="nodeContainer" style={{ ...getStyles(coordinates.x, coordinates.y, isDragging) }}>
        <div>
            {data.inputs.map(input => {
                return <Pin key={input} pin={input} />
            })}
        </div>
        <p><b>{element.name}</b></p>
        <div>
            {data.outputs.map(output => {
                return <Pin key={output} pin={output} />
            })}
        </div>
    </div>
}

const getStyles = (
    left: number,
    top: number,
    isDragging: boolean,
): React.CSSProperties => {
    const transform = `translate3d(${left}px, ${top}px, 0)`
    return {
        position: 'absolute',
        transform,
        WebkitTransform: transform,
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : '',
    }
}

function snapToGrid(x: number, y: number): [number, number] {
    const snappedX = Math.round(x / 10) * 10
    const snappedY = Math.round(y / 10) * 10
    return [snappedX, snappedY]
}

export default Node;