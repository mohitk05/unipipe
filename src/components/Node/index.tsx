import * as React from "react";
import * as ReactDOM from "react-dom";
import Pin from "./../Pin";
import { NodeType, MainContext } from "../../context/main";
import "./index.css";
import { ElementType, getElement } from "../../util/element";
import Edit from "../../assets/edit.svg";
import Block from "../../assets/block.svg";
import Code from "../../assets/code.svg";
import Branch from "../../assets/branch.svg";
import Cross from "../../assets/cross.svg";
import CodeBox from "../CodeBox";
import Chart from "../Chart";

function getIcon(name: string) {
    console.log(name)
    switch (name) {
        case "API":
            return Block;
        case "display":
            return Branch;
        case "SCRIPT":
            return Code;
        default:
            return Branch;
    }
}

const { useState, useRef, useContext } = React;

type NodeProps = {
    data: NodeType;
};

const Node = ({ data }: NodeProps) => {
    const [coordinates, setCoordinates] = useState(
        data.position || { x: 170, y: 20 }
    );
    const [dataModalOpen, setDataModalOpen] = useState(false);
    const [element, setElement] = useState<ElementType>();
    const [modalData, setModalData] = useState<any>();
    const {
        state: {
            board: { inputPins, outputPins },
        },
        dispatch,
    } = useContext(MainContext);
    const nodeRef = useRef<HTMLDivElement>(null);
    const mousePosRef = useRef({ x: 0, y: 0 });

    function setInitialModalData(element: ElementType) {
        if (element.key === "SCRIPT") {
            setModalData(data.data.inputCode);
        } else {
            setModalData(data.data ? JSON.stringify(data.data, null, 4) : "");
        }
    }

    React.useEffect(() => {
        getElement(data.type).then((el) => {
            setElement(el);
            setInitialModalData(el);
        });
    }, []);

    const openModal = () => {
        setDataModalOpen(true);
    };

    const closeModal = () => {
        setDataModalOpen(false);
    };

    const onClickModalInner = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const updateModalData = (data: string) => {
        setModalData(data);
    };

    const saveUpdatedData = (element: ElementType) => {
        try {
            let updatedData;
            if (element.key === "SCRIPT") {
                updatedData = {
                    inputCode: modalData,
                    arguments: "",
                    status: 0,
                };
            } else {
                updatedData = JSON.parse(modalData);
            }
            dispatch({
                type: "UPDATE_NODE_DATA",
                data: {
                    node: data.id,
                    newData: updatedData,
                },
            });
            closeModal();
        } catch {
            console.error({
                message: "Error!",
                description: "Invalid JSON structure, cannot save.",
            });
        }
    };

    const deleteNode = () => {
        // 1. Clear references of input and output pins from connected nodes
        // 2. Delete all pins
        // 3. Delete node
        data.inputs.forEach((input: string) => {
            if (inputPins && inputPins[input].ref) {
                dispatch({
                    type: "DISCONNECT_PINS",
                    data: {
                        input,
                        output: inputPins ? inputPins[input].ref : "",
                    },
                });
            }
        });
        data.outputs.forEach((output: string) => {
            outputPins &&
                outputPins[output].refs.forEach((ref: string) => {
                    dispatch({
                        type: "DISCONNECT_PINS",
                        data: {
                            input: ref,
                            output,
                        },
                    });
                });
        });
        dispatch({
            type: "DELETE_NODE",
            data: {
                node: data.id,
            },
        });
    };

    const moveNode = (e: MouseEvent) => {
        e.preventDefault();
        const diffx = e.clientX - mousePosRef.current.x;
        const diffy = e.clientY - mousePosRef.current.y;
        mousePosRef.current = { x: e.clientX, y: e.clientY };
        setCoordinates(({ x, y }) => {
            return {
                x: x + diffx,
                y: y + diffy,
            };
        });
    };

    const onMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        if (nodeRef.current) {
            document.onmousemove = moveNode;
            mousePosRef.current = { x: e.clientX, y: e.clientY };
        }
    };

    const onMouseUp = () => {
        document.onmousemove = null;
        dispatch({
            type: "UPDATE_NODE_POSITION",
            data: {
                node: data.id,
                x: coordinates.x,
                y: coordinates.y,
            },
        });
    };

    const getPortalElement = () => {
        let el = document.getElementById("codebox-div");
        if (!el) {
            el = document.createElement("div");
            el.id = "codebox-div";
            document.body.appendChild(el);
        }
        return el;
    };

    return (
        <div
            ref={nodeRef}
            className={
                element && /display|html|html/.test(element.key)
                    ? "nodeContainer containerDisplay"
                    : "nodeContainer"
            }
            style={{
                ...getStyles(coordinates.x, coordinates.y, dataModalOpen),
            }}
        >
            {element && (
                <div
                    style={{ zIndex: 1 }}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                >
                    <div className="nodeHeader">
                        <p
                            style={{
                                textAlign: "center",
                                margin: "10px 5px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <span
                                className={getStatusClass(data.data.status)}
                            ></span>
                        </p>
                        <div style={{ width: "100%" }}>
                            <span style={{ position: 'relative', top: 3 }}>{element.name}</span>
                            <div style={{ float: "right" }}>
                                {["SCRIPT", "API", "constant", "conditional"].includes(
                                    element.key
                                ) && <img onClick={openModal} src={Edit} />}
                                &nbsp;
                                <img onClick={deleteNode} src={Cross} />
                            </div>
                        </div>
                    </div>

                    <div className="top">
                        {element.key === "constant" ? (
                            <div
                                style={{
                                    border: "2px solid #ccc",
                                    padding: 5,
                                    fontFamily: "monospace",
                                    fontSize: '0.7rem'
                                }}
                            >
                                <span>
                                    {JSON.stringify(data.data.value).slice(
                                        0,
                                        20
                                    )}
                                </span>
                            </div>
                        ) : null}
                        <div>
                            {data.inputs.map((input) => {
                                return (
                                    <Pin
                                        key={input}
                                        pin={input}
                                        nodeCoordinates={coordinates}
                                    />
                                );
                            })}
                        </div>
                        <div>
                            {data.outputs.map((output) => {
                                return (
                                    <Pin
                                        key={output}
                                        pin={output}
                                        nodeCoordinates={coordinates}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    {element.key === "display" ? (
                        <div
                            style={{
                                padding: 10,
                                height: "auto",
                                width: "100%",
                                overflow: "auto",
                                fontFamily: "Menlo",
                                fontSize: "1rem",
                                whiteSpace: "pre-wrap",
                            }}
                        >
                            <pre>
                                {data.data.value
                                    ? JSON.stringify(data.data.value, null, 2)
                                    : "Value"}
                            </pre>
                        </div>
                    ) : null}
                    {element.key === "html" ? (
                        <div
                            style={{ margin: "5px 10px" }}
                            dangerouslySetInnerHTML={{
                                __html: data.data.value,
                            }}
                        ></div>
                    ) : null}
                    {element.key === "chart" && data.data.value && (
                        <div style={{ margin: "5px 10px" }}>
                            <Chart data={data.data.value} />
                        </div>
                    )}
                </div>
            )}
            {dataModalOpen && element
                ? ReactDOM.createPortal(
                    <div style={styles.modal} onClick={closeModal}>
                        <div
                            style={styles.modalInner}
                            onClick={onClickModalInner}
                        >
                            <div style={styles.modalHeader}>
                                <span>
                                    {" "}
                                    {">"}_&nbsp;&nbsp;Editor - {element.name}
                                </span>
                                <div style={styles.modalHeaderRight}>
                                    <div
                                        onClick={() =>
                                            saveUpdatedData(element)
                                        }
                                        style={styles.modalSaveButton}
                                    >
                                        Save Changes
                                      </div>
                                    <img onClick={closeModal} src={Cross} />
                                </div>
                            </div>
                            <CodeBox
                                value={modalData}
                                onChange={updateModalData}
                            />
                        </div>
                    </div>,
                    getPortalElement()
                )
                : null}
        </div>
    );
};

const getStatusClass = (status: number) => {
    const prefix = "status ";
    switch (status) {
        case 0:
            return prefix + "pending";
        case 1:
            return prefix + "executing";
        case 2:
            return prefix + "successful";
        case 3:
            return prefix + "failed";
    }
};

const getStyles = (
    left: number,
    top: number,
    modalOpen: boolean
): React.CSSProperties => {
    return {
        position: "absolute",
        left,
        top,
        zIndex: modalOpen ? 4 : 2,
    };
};

const styles = {
    modal: {
        position: "fixed" as "fixed",
        left: 0,
        top: 0,
        background: "rgba(0,0,0,0.4)",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 4,
        flexDirection: "column" as "column",
    },
    modalHeader: {
        width: 800,
        height: 40,
        fontSize: 15,
        lineHeight: "150%",
        fontWeight: 600,
        padding: "8px 20px 8px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    modalHeaderRight: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
    },
    modalInner: {
        borderRadius: 10,
        width: 800,
        background: "#FFF",
        overflow: "hidden",
        boxShadow: '0px 6px 10px rgba(51, 54, 68, 0.05), 0px 10px 16px rgba(51, 54, 68, 0.15)'
    },
    modalSaveButton: {
        width: 119,
        height: 25,
        background: "#4F8AFB",
        fontSize: 15,
        lineHeight: "150%",
        color: "#FFFFFF",
        borderRadius: 4,
        textAlign: "center" as "center",
        marginRight: 20,
    },
    inputArea: {
        fontFamily: "Menlo, monospace",
        width: "100%",
        display: "block",
        height: 300,
        marginBottom: 10,
    },
};

export default Node;
