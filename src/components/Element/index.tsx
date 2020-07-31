import React, { useContext } from 'react';
import { MainContext } from '../../context/main';
import { ElementType, getElement } from './../../util/element';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';

interface ElementProps {
    data: ElementType
}

const Element = ({ data }: ElementProps) => {
    const { state: { board: { engine } } } = useContext(MainContext);

    const addElementToBoard = () => {
        const model = engine?.getModel();
        const node = new DefaultNodeModel({
            name: data.type,
            color: data.color,
            extras: {
                type: data.id
            }
        });
        node.setPosition(0, 0);

        addPorts(data.id, node);

        model?.addNode(node);
        engine?.repaintCanvas();
        localStorage.setItem('unipipe_model', JSON.stringify(model?.serialize()));
    }

    return (
        <div style={styles.element}>
            <p>{data.name}</p>
            <button onClick={addElementToBoard}>Add</button>
        </div>
    )
}

const styles = {
    element: {
        padding: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    }
}

export default Element;

const addPorts = (elementId: string, node: DefaultNodeModel) => {
    const element = getElement(elementId);
    element.pinMapping.inputs.forEach(input => {
        node.addInPort(input.label);
    })

    element.pinMapping.outputs.forEach(output => {
        node.addOutPort(output.label);
    })
}