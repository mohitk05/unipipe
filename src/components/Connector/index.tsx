import React from 'react';
import { OutPinType, InPinType } from '../../context/main';

type ConnectorProps = {
    source: OutPinType;
    destinations: InPinType[]
}

const Connector = ({ source, destinations }: ConnectorProps) => {
    return <>{destinations.map(dest =>
        <line x1={source.coordinates?.x} y1={source.coordinates?.y} x2={dest.coordinates?.x} y2={dest.coordinates?.y} style={{ stroke: 'rgb(255,0,0)', strokeWidth: 2 }} ></line>
    )}</>
}

export default Connector;