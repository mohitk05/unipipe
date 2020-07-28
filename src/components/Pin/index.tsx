import React, { useContext, useState } from 'react';
import { MainContext, InPinType, OutPinType } from '../../context/main';

type PinProps = {
    pin: string
}

const Pin = (props: PinProps) => {
    const { state: { board }, dispatch } = useContext(MainContext);
    const getPin = (pinId: string): InPinType | OutPinType => {
        return Object.assign({}, board.inputPins, board.outputPins)[pinId];
    }

    const markSelected = (pin: string) => {
        dispatch({
            type: 'SELECT_PIN',
            data: {
                pin
            }
        })
    }

    const pinClicked = () => {
        if (board.selectedPin) {
            const selected = getPin(board.selectedPin);
            if (selected.type === pinObject.type) {
                console.log('Cannot connect similar pins.')
            } else {
                if (pinObject.type === 'in') {
                    // add selected id to current ref
                    dispatch({
                        type: 'CONNECT_PINS',
                        data: {
                            input: props.pin,
                            output: board.selectedPin
                        }
                    })
                }
            }
            dispatch({
                type: 'RESET_SELECTED_PIN'
            })
        } else {
            markSelected(props.pin);
        }
    }

    const pinObject = getPin(props.pin);

    const getTag = (type: string) => {
        switch (type) {
            case 'in':
                return <span>-&nbsp;{pinObject.name}</span>
            case 'out':
                return <span>{pinObject.name}&nbsp;-</span>
            default:
                return <span>invalid!</span>
        }
    }

    return <div onClick={pinClicked}>
        <div style={board.selectedPin === props.pin ? styles.selected : { padding: 4 }}>{getTag(pinObject.type)}</div>
    </div>
}

const styles = {
    selected: {
        background: 'salmon',
        color: 'white',
        padding: 4,
        borderRadius: 2
    }
}

export default Pin;