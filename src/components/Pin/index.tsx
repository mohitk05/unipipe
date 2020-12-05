import * as React from "react";
import { MainContext, InPinType, OutPinType } from "../../context/main";

const { useContext, useEffect, useRef, useCallback } = React;

type PinProps = {
    pin: string;
    nodeCoordinates: {
        x: number;
        y: number;
    };
};

const Pin = (props: PinProps) => {
    const {
        state: { board },
        dispatch,
    } = useContext(MainContext);
    const pinRef = useRef<HTMLDivElement>(null);

    const getPin = useCallback(
        (pinId: string): InPinType | OutPinType => {
            return Object.assign({}, board.inputPins, board.outputPins)[pinId];
        },
        [board.inputPins, board.outputPins]
    );

    const pin = getPin(props.pin);

    useEffect(() => {
        if (pinRef.current) {
            dispatch({
                type:
                    pin.type === "in"
                        ? "UPDATE_INPUT_PIN_POSITION"
                        : "UPDATE_OUTPUT_PIN_POSITION",
                data: {
                    pin: props.pin,
                    x:
                        props.nodeCoordinates.x +
                        pinRef.current.offsetLeft +
                        (pin.type === "out" ? pinRef.current.offsetWidth : 0),
                    y:
                        props.nodeCoordinates.y +
                        pinRef.current.offsetTop -
                        14 +
                        pinRef.current.offsetHeight,
                },
            });
        }
    }, [props.nodeCoordinates, dispatch, props.pin, pin.type]);

    const markSelected = (pin: string) => {
        dispatch({
            type: "SELECT_PIN",
            data: {
                pin,
            },
        });
    };

    const pinClicked = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (board.selectedPin) {
            const selected = getPin(board.selectedPin);
            if (selected.type === pinObject.type) {
                console.log("Cannot connect similar pins.");
            } else {
                if (pinObject.type === "in" && !pinObject.ref) {
                    // add selected id to current ref
                    dispatch({
                        type: "CONNECT_PINS",
                        data: {
                            input: props.pin,
                            output: board.selectedPin,
                        },
                    });
                }
            }
            dispatch({
                type: "RESET_SELECTED_PIN",
            });
        } else {
            markSelected(props.pin);
        }
    };

    const pinObject = getPin(props.pin);

    const getTag = (type: string) => {
        switch (type) {
            case "in":
                return (
                    <span
                        style={{
                            textTransform: "capitalize",
                            ...styles.pinText,
                        }}
                    >
                        ●&nbsp;&nbsp;{pinObject.label}
                    </span>
                );
            case "out":
                return (
                    <span
                        style={{
                            textTransform: "capitalize",
                            ...styles.pinText,
                        }}
                    >
                        {pinObject.label}&nbsp;&nbsp;●
                    </span>
                );
            default:
                return <span>invalid!</span>;
        }
    };

    return (
        <div onClick={pinClicked} ref={pinRef}>
            <div
                style={
                    board.selectedPin === props.pin
                        ? styles.selected
                        : {
                              padding: 4,
                              textAlign:
                                  pinObject.type === "in" ? "left" : "right",
                          }
                }
            >
                {getTag(pinObject.type)}
            </div>
        </div>
    );
};

const styles = {
    selected: {
        background: "#EBF2FF",
        color: "white",
        padding: 4,
        borderRadius: 2,
    },
    pinText: {
        width: "44px",
        height: "20px",
        fontSize: "13px",
        lineHeight: "150%",
        color: "#45526C",
    },
};

export default Pin;
