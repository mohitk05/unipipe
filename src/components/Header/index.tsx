import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { generateSlug } from "random-word-slugs";
import { ref, set } from "firebase/database";
import { database } from "./../../util/firebase";

import "./index.css";

import { MainContext } from "../../context/main";
import { getAllElements } from "../../util/element";

import Category from "../../assets/category.svg";
import Graph from "../../assets/graph.svg";
import Play from "../../assets/play.svg";
import Plus from "../../assets/plus.svg";
import ElementList from "../ElementList";

const middleNav = [
    { name: "Charts", icon: Graph, inactive: true },
    { name: "Viewer", icon: Play, inactive: true },
    { name: "Flows", icon: Category, inactive: true },
];

/* eslint import/no-webpack-loader-syntax: off */
const executor = new Worker("../../executor/executor-new.worker.ts");
const { useContext, useEffect } = React;

const HeaderModule = () => {
    const location = useLocation();
    const recipeKey = location.pathname.split('/').pop();
    const {
        state: { board },
        dispatch,
    } = useContext(MainContext);
    const { nodes, inputPins, outputPins, headNode } = board;
    const [explorerOpen, setExplorerOpen] = React.useState(false);
    const [saveText, setSaveText] = React.useState("Save Flow");
    const [recipeTitle, setRecipeTitle] = React.useState(recipeKey === "new" ? generateSlug() : recipeKey);

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

    const onRecipeTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRecipeTitle(value);
    }

    const saveRecipe = () => {
        if (!recipeTitle || !board || !Object.keys(board).length) return;
        // Save
        set(ref(database, `recipes/${recipeTitle}`), {
            title: recipeTitle,
            board
        })
            .then(() => {
                setSaveText("Saved!");
                if (recipeTitle !== location.pathname.split('/').pop()) {
                    window.location.pathname = window.location.pathname.replace(location.pathname.split('/').pop() as string, recipeTitle);
                }
                setTimeout(() => {
                    setSaveText("Save Flow");
                }, 5000);
            });
    };

    const openBlocksExplorer = () => {
        setExplorerOpen(true);
    };

    return (
        <div className="header">
            <div className="leftNav">
                <Link to="/">
                    <svg width="100" height="30" viewBox="0 0 483 161" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M48.096 98.4559V55.5439H52.544C61.3806 55.5439 68.544 62.7074 68.544 71.5439V131H49.68V121.784C45.744 129.08 38.352 132.728 27.504 132.728C18.672 132.728 11.856 130.04 7.056 124.664C2.352 119.192 0 111.848 0 102.632V55.5439H4.448C13.2846 55.5439 20.448 62.7074 20.448 71.5439V100.328C20.448 110.216 24.624 115.16 32.976 115.16C37.968 115.16 41.712 113.72 44.208 110.84C46.8 107.96 48.096 103.832 48.096 98.4559Z" fill="black" />
                        <path d="M92.8524 55.5439C97.9422 55.5439 102.068 59.6701 102.068 64.7599C106.004 57.4639 113.492 53.8159 124.532 53.8159C133.46 53.8159 140.324 56.5519 145.124 62.0239C149.924 67.3999 152.324 74.6959 152.324 83.9119V131H131.876V86.2159C131.876 76.3279 127.604 71.3839 119.06 71.3839C114.164 71.3839 110.372 72.8719 107.684 75.8479C104.996 78.7279 103.652 82.7119 103.652 87.7999V131H83.2044V55.5439H92.8524Z" fill="black" />
                        <path d="M185.544 42.2959C183.24 44.5999 180.264 45.7519 176.616 45.7519C172.968 45.7519 169.992 44.5999 167.688 42.2959C165.384 39.9919 164.232 37.0639 164.232 33.5119C164.232 29.9599 165.384 27.0319 167.688 24.7279C169.992 22.3279 172.968 21.1279 176.616 21.1279C180.264 21.1279 183.24 22.3279 185.544 24.7279C187.848 27.0319 189 29.9599 189 33.5119C189 37.0639 187.848 39.9919 185.544 42.2959ZM166.392 131V55.5439H170.84C179.676 55.5439 186.84 62.7074 186.84 71.5439V131H166.392Z" fill="black" />
                        <path d="M222.074 122.936V160.952H201.626V55.5439H211.274C216.364 55.5439 220.49 59.6701 220.49 64.7599C225.482 57.4639 233.45 53.8159 244.394 53.8159C255.05 53.8159 263.498 57.5599 269.738 65.0479C275.978 72.5359 279.098 81.9439 279.098 93.2719C279.098 104.6 275.978 114.008 269.738 121.496C263.498 128.984 255.05 132.728 244.394 132.728C239.402 132.728 234.938 131.816 231.002 129.992C227.162 128.072 224.186 125.72 222.074 122.936ZM226.538 77.8639C223.178 81.8959 221.498 87.0319 221.498 93.2719C221.498 99.5119 223.178 104.648 226.538 108.68C229.994 112.712 234.506 114.728 240.074 114.728C245.642 114.728 250.106 112.712 253.466 108.68C256.922 104.648 258.65 99.5119 258.65 93.2719C258.65 87.0319 256.922 81.8959 253.466 77.8639C250.106 73.8319 245.642 71.8159 240.074 71.8159C234.506 71.8159 229.994 73.8319 226.538 77.8639Z" fill="black" />
                        <path d="M308.184 42.2959C305.88 44.5999 302.905 45.7519 299.257 45.7519C295.608 45.7519 292.632 44.5999 290.328 42.2959C288.025 39.9919 286.872 37.0639 286.872 33.5119C286.872 29.9599 288.025 27.0319 290.328 24.7279C292.632 22.3279 295.608 21.1279 299.257 21.1279C302.905 21.1279 305.88 22.3279 308.184 24.7279C310.488 27.0319 311.641 29.9599 311.641 33.5119C311.641 37.0639 310.488 39.9919 308.184 42.2959ZM289.033 131V55.5439H293.48C302.317 55.5439 309.48 62.7074 309.48 71.5439V131H289.033Z" fill="black" />
                        <path d="M344.715 122.936V160.952H324.267V55.5439H333.915C339.005 55.5439 343.131 59.6701 343.131 64.7599C348.123 57.4639 356.091 53.8159 367.035 53.8159C377.691 53.8159 386.139 57.5599 392.379 65.0479C398.619 72.5359 401.739 81.9439 401.739 93.2719C401.739 104.6 398.619 114.008 392.379 121.496C386.139 128.984 377.691 132.728 367.035 132.728C362.043 132.728 357.579 131.816 353.643 129.992C349.803 128.072 346.827 125.72 344.715 122.936ZM349.179 77.8639C345.819 81.8959 344.139 87.0319 344.139 93.2719C344.139 99.5119 345.819 104.648 349.179 108.68C352.635 112.712 357.147 114.728 362.715 114.728C368.283 114.728 372.747 112.712 376.107 108.68C379.563 104.648 381.291 99.5119 381.291 93.2719C381.291 87.0319 379.563 81.8959 376.107 77.8639C372.747 73.8319 368.283 71.8159 362.715 71.8159C357.147 71.8159 352.635 73.8319 349.179 77.8639Z" fill="black" />
                        <path d="M481.945 99.1759H427.225C427.897 104.36 429.817 108.344 432.985 111.128C436.153 113.816 440.329 115.16 445.513 115.16C448.777 115.16 451.705 114.488 454.297 113.144C456.985 111.704 458.905 109.64 460.057 106.952H480.649C478.441 114.632 474.073 120.872 467.545 125.672C461.113 130.376 453.577 132.728 444.937 132.728C433.801 132.728 424.681 129.032 417.577 121.64C410.473 114.248 406.921 104.744 406.921 93.1279C406.921 81.8959 410.473 72.5359 417.577 65.0479C424.681 57.5599 433.753 53.8159 444.793 53.8159C455.833 53.8159 464.809 57.5599 471.721 65.0479C478.729 72.4399 482.233 81.7999 482.233 93.1279L481.945 99.1759ZM444.649 70.2319C440.041 70.2319 436.249 71.5279 433.273 74.1199C430.297 76.6159 428.377 80.0719 427.513 84.4879H461.785C461.017 80.1679 459.145 76.7119 456.169 74.1199C453.193 71.5279 449.353 70.2319 444.649 70.2319Z" fill="black" />
                        <path d="M176.859 33L188.605 26.4302C218.086 9.94097 253.899 9.44926 283.821 25.1229L298.859 33" stroke="#9473F2" stroke-width="3" />
                    </svg>

                    {/* <img
                        style={{
                            width: 35,
                            height: 35,
                            transform: "rotate(90deg)",
                        }}
                        src={Logo}
                    /> */}
                </Link>
                <input type="text" onChange={onRecipeTitleChange} value={recipeTitle} />
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
                            <div key={index} className={`button iconButton${item.inactive ? ' inactiveButton' : ''}`}>
                                <img src={item.icon} />
                                <span className="iconText">{item.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="rightNav">
                        <a className="docButton" href="https://github.com/mohitk05/unipipe">
                            GitHub
                        </a>
                        <div
                            onClick={executeBoard}
                            className="executeButton"
                        >
                            <span>Execute</span>
                        </div>
                        <div
                            onClick={saveRecipe}
                            className="button exportButton"
                        >
                            <span>{saveText}</span>
                        </div>
                        {explorerOpen && (
                            <div
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    width: "100%",
                                    height: '100vh',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
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
                    </div>
                </>
            )}
        </div>
    );
};

export default HeaderModule;
