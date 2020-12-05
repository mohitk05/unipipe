import * as React from "react";
import Node from "./../Node";
import { MainContext } from "../../context/main";
import Connector from "../Connector";

const { useContext } = React;
const Board = () => {
    const {
        state: { board },
    } = useContext(MainContext);
    const { nodes, inputPins, outputPins } = board;

    return (
        <div style={styles.board}>
            {nodes &&
                nodes.map((node) => {
                    return <Node key={node.id} data={node} />;
                })}
            <svg style={styles.svgParent}>
                {outputPins &&
                    Object.keys(outputPins).map((key) => {
                        return (
                            <>
                                {outputPins[key].refs.map((ref) => {
                                    if (inputPins) {
                                        const inputPin = inputPins[ref];
                                        return (
                                            <Connector
                                                key={ref}
                                                from={outputPins[key]}
                                                to={inputPin}
                                            />
                                        );
                                    } else return null;
                                })}
                            </>
                        );
                    })}
            </svg>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    board: {
        padding: 16,
        width: "100%",
        position: "relative",
        overflow: "scroll",
        zoom: 0.7,
    },
    svgParent: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 1,
    },
};

export default Board;
