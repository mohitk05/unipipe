import * as React from "react";
import Node from "./../Node";
import { MainContext } from "../../context/main";
import Connector from "../Connector";
import Executor from "worker-loader!../../executor/executor-new.worker";
import { getAllElements } from "../../util/element";
import { v4 as uuidv4 } from "uuid";
/* eslint import/no-webpack-loader-syntax: off */
const executor = new Executor();

const { useContext, useEffect } = React;

const Board = () => {
    const {
        state: { board },
        dispatch,
    } = useContext(MainContext);
    const { nodes, inputPins, outputPins, headNode } = board;

    useEffect(() => {
        executor.addEventListener("message", (e: MessageEvent) => {
            const data: { type: string; node: string; update: object } = e.data;
            switch (data.type) {
                case "update_node":
                    dispatch({
                        type: "UPDATE_NODE_DATA_PARTIAL",
                        data: {
                            node: data.node,
                            update: data.update,
                        },
                    });
                    break;
                default:
                    return;
            }
        });
    }, [dispatch]);

    const executeBoard = () => {
        executor.postMessage({
            action: "execute",
            data: {
                nodes: nodes || [],
                inputPins: inputPins || {},
                outputPins: outputPins || {},
                elements: getAllElements(),
                headNode: headNode || "",
            },
        });
    };

    const saveRecipe = () => {
        // Replace with server call
        localStorage.setItem("recipe_" + uuidv4(), JSON.stringify(board));
    };

    const loadRecipe = () => {
        const recipe = localStorage.getItem(
            "recipe_922c6adb-1c70-4b51-b895-e55e59eb8e14"
        );
        if (recipe) {
            let recipe_state = JSON.parse(recipe);
            dispatch({
                type: "LOAD_RECIPE",
                data: {
                    state: recipe_state,
                },
            });
        }
    };

    return (
        <div style={styles.board}>
            <header style={styles.header}>
                <h1>unipipe</h1>
            </header>
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
            <div style={styles.executeMenu}>
                <h4 style={{ margin: "0 0 10px 0" }}>Controls</h4>
                <button style={styles.button} onClick={executeBoard}>
                    Execute
                </button>
                <button style={styles.button} onClick={saveRecipe}>
                    Save as Recipe
                </button>
                <button style={styles.button} onClick={loadRecipe}>
                    Load a recipe
                </button>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    board: {
        padding: 16,
        width: "100%",
        position: "relative",
    },
    executeMenu: {
        background: "white",
        padding: 20,
        zIndex: 3,
        position: "absolute",
        right: 40,
        top: 20,
        borderRadius: 2,
        boxShadow: "0 0 10px 2px #eee",
    },
    svgParent: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 1,
    },
    header: {},
    button: {
        background: "white",
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: "5px 10px",
        display: "block",
        width: 150,
        marginTop: 5,
    },
};

export default Board;
