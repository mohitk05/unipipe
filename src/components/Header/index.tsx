import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/pipe.png";

import "./index.css";

import { MainContext } from "../../context/main";
import Executor from "worker-loader!../../executor/executor-new.worker";
import { getAllElements } from "../../util/element";
import { v4 as uuidv4 } from "uuid";

import Category from "../../assets/category.svg";
import Graph from "../../assets/graph.svg";
import Play from "../../assets/play.svg";
import Plus from "../../assets/plus.svg";
import Document from "../../assets/document.svg";
import Wand from "../../assets/wand.svg";
import Share from "../../assets/share.svg";
import Save from "../../assets/save.svg";
import ChevronDown from "../../assets/chevronDown.svg";
import ElementList from "../ElementList";

const middleNav = [
    { name: "Charts", icon: Graph },
    { name: "Viewer", icon: Play },
    { name: "Flows", icon: Category },
];

/* eslint import/no-webpack-loader-syntax: off */
const executor = new Executor();
const { useContext, useEffect } = React;

const HeaderModule = () => {
    const location = useLocation();
    const {
        state: { board },
        dispatch,
    } = useContext(MainContext);
    const { nodes, inputPins, outputPins, headNode } = board;
    const [explorerOpen, setExplorerOpen] = React.useState(false);

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

    const executeBoard = async () => {
        let allElements = await getAllElements();
        executor.postMessage({
            action: "execute",
            data: {
                nodes: nodes || [],
                inputPins: inputPins || {},
                outputPins: outputPins || {},
                elements: allElements,
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

    const openBlocksExplorer = () => {
        setExplorerOpen(true);
    };

    return (
        <div className="header">
            <div className="leftNav">
                <Link to="/">
                    <img
                        style={{
                            width: 35,
                            height: 35,
                            transform: "rotate(90deg)",
                        }}
                        src={Logo}
                    />
                </Link>
            </div>
            {location.pathname.includes("/home/") && (
                <>
                    <div className="middleNav">
                        <div
                            className="button iconButton"
                            onClick={openBlocksExplorer}
                        >
                            <img src={Plus} />
                            <span className="iconText">Blocks</span>
                        </div>
                        {middleNav.map((item, index) => (
                            <div key={index} className="button iconButton">
                                <img src={item.icon} />
                                <span className="iconText">{item.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="rightNav">
                        <Link to="/docs">
                            <div className="button docButton">
                                <img src={Document} />
                                <span className="iconText">Docs</span>
                            </div>
                        </Link>
                        <div
                            onClick={executeBoard}
                            className="button executeButton"
                        >
                            <img src={Wand} />
                            <span>Execute</span>
                        </div>
                        <div
                            onClick={saveRecipe}
                            className="button shareButton"
                        >
                            <img src={Share} />
                        </div>
                        <div
                            onClick={saveRecipe}
                            className="button exportButton"
                        >
                            <img src={Save} />
                            <span>Export</span>
                            <img src={ChevronDown} />
                        </div>
                    </div>
                    {explorerOpen && (
                        <div
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                width: "100%",
                            }}
                        >
                            <div className="blocksModal">
                                <div>
                                    <ElementList
                                        close={() => setExplorerOpen(false)}
                                    />
                                </div>
                            </div>
                            <div className="blocksModalOverlay"></div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default HeaderModule;
