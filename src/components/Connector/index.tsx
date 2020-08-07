import React, { useCallback } from 'react';
import { OutPinType, InPinType } from '../../context/main';

type ConnectorProps = {
    from: OutPinType;
    to: InPinType
}

const Connector = (props: ConnectorProps) => {
    const getLineColor = useCallback(() => {
        return getColor(props.to.id)
    }, [props.to.id])
    if (!props.from.position || !props.to.position) return null;
    return <path
        d={`M ${props.from.position.x} ${props.from.position.y} L ${props.from.position.x} ${props.from.position.y} C ${props.to.position.x} ${props.from.position.y} ${props.from.position.x} ${props.to.position.y} ${props.to.position.x + 5} ${props.to.position.y}`}
        stroke={getLineColor()}
        strokeWidth="2"
        fill="none"
    ></path>
}

const getColor = (id: string) => {
    const colors = localStorage.getItem('colors');
    if (colors) {
        const colorMap: { [id: string]: string } = JSON.parse(colors);
        if (colorMap[id]) return colorMap[id];
        else {
            colorMap[id] = `hsl(${Math.floor(Math.random() * 360)}, 100%, 40%)`;
            localStorage.setItem('colors', JSON.stringify(colorMap));
            return colorMap[id];
        }
    } else {
        let colorMap: { [id: string]: string } = {};
        colorMap[id] = `hsl(${Math.floor(Math.random() * 360)}, 100%, 40%)`;
        localStorage.setItem('colors', JSON.stringify(colorMap));
        return colorMap[id];
    }
}

export default Connector;