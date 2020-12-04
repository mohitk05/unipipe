import * as React from 'react';
import { MainContext } from '../../context/main';
import { createNode } from './../../util/node';
import { ElementType } from './../../util/element';
import {
    AppstoreAddOutlined
} from '@ant-design/icons';
interface ElementProps {
    data: ElementType
}

const Element = ({ data }: ElementProps) => {
    const { dispatch } = React.useContext(MainContext);

    const addElementToBoard = () => {
        let { node, inputPins, outputPins } = createNode(data.id)
        dispatch({
            type: 'CREATE_NODE',
            data: {
                node
            }
        })
        dispatch({
            type: 'ADD_INPUT_PINS',
            data: {
                pins: inputPins
            }
        })
        dispatch({
            type: 'ADD_OUTPUT_PINS',
            data: {
                pins: outputPins
            }
        })
    }

    return (
        <div onClick={addElementToBoard} style={styles.element}>
            <p style={{ margin: 0 }}>{data.name}</p>
            <AppstoreAddOutlined />
        </div>
    )
}

const styles = {
    element: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    }
}

export default Element;