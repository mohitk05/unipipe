import React from 'react';
import { OutPinType, InPinType } from '../../context/main';

type ConnectorProps = {
    from: OutPinType;
    to: InPinType
}

const Connector = (props: ConnectorProps) => {
    if (!props.from.position || !props.to.position) return null;
    return <path
        d={`M ${props.from.position.x} ${props.from.position.y} L ${props.from.position.x} ${props.from.position.y} C ${props.to.position.x} ${props.from.position.y} ${props.from.position.x} ${props.to.position.y} ${props.to.position.x} ${props.to.position.y} L ${props.to.position.x} ${props.to.position.y}`}
        stroke="red"
        strokeWidth="2"
        fill="none"
    ></path>
}

export default Connector;