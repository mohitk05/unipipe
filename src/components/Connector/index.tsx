import * as React from "react";
import { OutPinType, InPinType, MainContext } from "../../context/main";
import "./index.css";

const { useCallback, useState, useContext, useEffect } = React;

type ConnectorProps = {
    from: OutPinType;
    to: InPinType;
};

const Connector = (props: ConnectorProps) => {
    const [selected, setSelected] = useState(false);
    const { dispatch } = useContext(MainContext);

    useEffect(() => {
        return () => {
            document.removeEventListener("keydown", handleBackspace);
        };
    }, []);

    const onClick = () => {
        setSelected((sel) => !sel);
        document.addEventListener("keydown", handleBackspace);
    };

    const handleBackspace = useCallback((e: KeyboardEvent) => {
        if (e.key === "Backspace" || e.key === "Delete") {
            document.removeEventListener("keydown", handleBackspace);
            dispatch({
                type: "DISCONNECT_PINS",
                data: {
                    input: props.to.id,
                    output: props.from.id,
                },
            });
        }
    }, []);

    const getLineColor = useCallback(() => {
        return "#45526C"; //getColor(props.to.id)
    }, [props.to.id]);
    if (!props.from.position || !props.to.position) return null;
    return (
        <>
            <path
                className={selected ? "connector selected" : "connector"}
                d={`M ${props.from.position.x + 5} ${props.from.position.y} C ${
                    props.to.position.x
                } ${props.from.position.y} ${props.from.position.x} ${
                    props.to.position.y
                } ${props.to.position.x - 5} ${props.to.position.y}`}
                stroke="#45526C"
                strokeWidth="1.5"
                fill="none"
                onClick={onClick}
            ></path>
            {selected && (
                <>
                    <circle
                        cx={props.from.position.x + 5}
                        cy={props.from.position.y}
                        r={10}
                        fill="red"
                    ></circle>
                    <circle
                        cx={props.to.position.x - 5}
                        cy={props.to.position.y}
                        r={10}
                        fill="red"
                    ></circle>
                </>
            )}
        </>
    );
};

const getColor = (id: string) => {
    const colors = localStorage.getItem("colors");
    if (colors) {
        const colorMap: { [id: string]: string } = JSON.parse(colors);
        if (colorMap[id]) return colorMap[id];
        else {
            colorMap[id] = `hsl(${Math.floor(Math.random() * 360)}, 100%, 40%)`;
            localStorage.setItem("colors", JSON.stringify(colorMap));
            return colorMap[id];
        }
    } else {
        let colorMap: { [id: string]: string } = {};
        colorMap[id] = `hsl(${Math.floor(Math.random() * 360)}, 100%, 40%)`;
        localStorage.setItem("colors", JSON.stringify(colorMap));
        return colorMap[id];
    }
};

export default Connector;
