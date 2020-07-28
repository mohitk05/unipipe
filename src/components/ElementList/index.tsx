import React from 'react';
import Element from './../Element';
import { getAllElements } from './../../util/element';

const ElementList = () => {
    const elements = getAllElements();
    return <div style={styles.elementList}>
        <h2>Elements</h2>
        {Object.keys(elements).map(el => {
            return <Element key={el} data={elements[el]} />
        })}
    </div>
}

const styles = {
    elementList: {
        padding: 20,
        width: 150,
        borderRight: '1px solid #ccc'
    }
}

export default ElementList;