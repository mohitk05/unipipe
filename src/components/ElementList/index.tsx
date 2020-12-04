import * as React from 'react';
import Element from './../Element';
import { getAllElements } from './../../util/element';
import { List } from 'antd';

const ElementList = () => {
    const elements = getAllElements();
    return <List
        header='Elements'
        bordered
        dataSource={Object.keys(elements)}
        renderItem={item => (
            <List.Item>
                <Element key={item} data={elements[item]} />
            </List.Item>
        )}
    />
}

const styles = {
    elementList: {
        padding: 20,
        width: 300,
        borderRight: '1px solid #ccc'
    }
}

export default ElementList;