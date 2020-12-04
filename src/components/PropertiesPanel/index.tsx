import * as React from 'react';
import { List } from 'antd';

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const PropertiesPanel = () => {
    return <List
        header="Properties"
        bordered
        dataSource={data}
        renderItem={item => (
            <List.Item>
                <p>{item}</p>
            </List.Item>
        )}
    />
}

export default PropertiesPanel;