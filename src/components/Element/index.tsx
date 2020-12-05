import * as React from "react";
import { MainContext } from "../../context/main";
import { createNode } from "./../../util/node";
import { ElementType } from "./../../util/element";
import "./index.css";
interface ElementProps {
    data: ElementType;
    onAdded: () => void;
}

const Element = ({ data, onAdded }: ElementProps) => {
    const { dispatch } = React.useContext(MainContext);

    const addElementToBoard = async () => {
        let { node, inputPins, outputPins } = await createNode(data.id);
        dispatch({
            type: "CREATE_NODE",
            data: {
                node,
            },
        });
        dispatch({
            type: "ADD_INPUT_PINS",
            data: {
                pins: inputPins,
            },
        });
        dispatch({
            type: "ADD_OUTPUT_PINS",
            data: {
                pins: outputPins,
            },
        });
        onAdded();
    };

    return (
        <div style={styles.element}>
            <h2 style={{ margin: 0 }}>{data.name}</h2>
            <p>
                {data.description || "No description available for this block."}
            </p>
            <button className="addToBoardButton" onClick={addElementToBoard}>
                Add to board
            </button>
        </div>
    );
};

const styles = {
    element: {
        width: "100%",
    },
};

export default Element;
