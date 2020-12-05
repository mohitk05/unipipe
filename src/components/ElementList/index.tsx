import * as React from "react";
import Element from "./../Element";
import { ElementType, getAllElements } from "./../../util/element";
import Cross from "../../assets/cross.svg";

import "./index.css";
export interface ElementResponseStructure {
    id: number;
    blockType: string;
    apiType: string | null;
    url: string | null;
    blockName: string;
    blockDescription: string;
    inputJson: string | null;
    inputImageUrl: string | null;
    outputImageUrl: string | null;
    inputCode: string | null;
    arguments: string | null;
}

export interface ElementListProps {
    close: () => void;
}

const ElementList = (props: ElementListProps) => {
    const [elements, setElements] = React.useState<{
        [id: string]: ElementType;
    }>({});
    const [selected, setSelected] = React.useState<ElementType | null>(null);
    React.useEffect(() => {
        getAllElements().then((items) => {
            setElements(items);
            items &&
                Object.keys(items) &&
                Object.keys(items)[0] &&
                setSelected(items[Object.keys(items)[0]]);
        });
    }, []);
    const setSelectedElement = (id: string) => () => {
        setSelected(elements[id]);
    };
    return (
        <div style={{ padding: 15 }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Blocks</h1>
                <img
                    src={Cross}
                    onClick={props.close}
                    style={{
                        cursor: "pointer",
                        display: "block",
                        padding: 5,
                        transform: "scale(1.4)",
                    }}
                ></img>
            </div>
            <div className="elementsList">
                <div className="elementsListLeft">
                    {Object.values(elements).map((el) => (
                        <h4
                            className={
                                selected && selected.id === el.id
                                    ? "elementName elementNameSelected"
                                    : "elementName"
                            }
                            onClick={setSelectedElement(el.id)}
                        >
                            {el.name}
                        </h4>
                    ))}
                </div>
                {selected && (
                    <div className="elementsListRight">
                        <Element onAdded={props.close} data={selected} />
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    elementList: {
        padding: 20,
        width: "20%",
        borderRight: "1px solid #ccc",
    },
};

export default ElementList;
