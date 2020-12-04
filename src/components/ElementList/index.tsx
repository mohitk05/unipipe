import * as React from "react";
import Element from "./../Element";
import { ElementType, getAllElements } from "./../../util/element";
import { List } from "antd";

export interface ElementResponseStructure {
    id: number;
    blockType: string;
    requestType: string | null;
    url: string | null;
    blockName: string;
    blockDescription: string;
    inputJson: string | null;
    inputImageUrl: string | null;
    outputImageUrl: string | null;
    inputCode: string | null;
    arguments: string | null;
}

const ElementList = () => {
    const [elements, setElements] = React.useState<{
        [id: string]: ElementType;
    }>({});
    React.useEffect(() => {
        getAllElements().then((items) => {
            setElements(items);
        });
    }, []);
    return (
        <List
            style={styles.elementList}
            header={<h2>Blocks</h2>}
            bordered
            dataSource={Object.keys(elements)}
            renderItem={(item) => (
                <List.Item>
                    <Element key={item} data={elements[item]} />
                </List.Item>
            )}
        />
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
