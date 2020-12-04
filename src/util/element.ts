import { getProcessor } from "./processor";
import { v4 as uuidv4 } from "uuid";
import { NodeType } from "../context/main";
import { ElementResponseStructure } from "../components/ElementList";

export type ElementType = {
    id: string;
    key: string;
    type: string;
    name: string;
    description?: string;
    processor?: string;
    pinMapping: InputOutput;
    initialData?: any;
    originalElement?: ElementResponseStructure;
};

type PinMapping = {
    [key: string]: InputOutput;
};

type InputOutput = {
    inputs: {
        type: "in";
        name: string;
        label: string;
    }[];
    outputs: {
        type: "out";
        label: string;
        name: string;
    }[];
};

export const pinMapping: PinMapping = {
    add: {
        inputs: [
            {
                type: "in",
                label: "input1",
                name: "input1",
            },
            {
                type: "in",
                label: "input2",
                name: "input2",
            },
        ],
        outputs: [
            {
                type: "out",
                label: "sum",
                name: "sum",
            },
        ],
    },
    square: {
        inputs: [
            {
                type: "in",
                label: "input",
                name: "input",
            },
        ],
        outputs: [
            {
                type: "out",
                label: "square",
                name: "square",
            },
        ],
    },
    factorial: {
        inputs: [
            {
                type: "in",
                label: "input",
                name: "input",
            },
        ],
        outputs: [
            {
                type: "out",
                label: "factorial",
                name: "factorial",
            },
        ],
    },
    conditional: {
        inputs: [
            {
                type: "in",
                label: "input1",
                name: "input1",
            },
            {
                type: "in",
                label: "input2",
                name: "input2",
            },
        ],
        outputs: [
            {
                type: "out",
                label: "true",
                name: "true",
            },
            {
                type: "out",
                label: "false",
                name: "false",
            },
        ],
    },
    constant: {
        inputs: [],
        outputs: [
            {
                type: "out",
                label: "constant",
                name: "constant",
            },
        ],
    },
    regex: {
        inputs: [
            {
                type: "in",
                label: "input",
                name: "input",
            },
        ],
        outputs: [
            {
                type: "out",
                label: "matches",
                name: "matches",
            },
        ],
    },
    console: {
        inputs: [
            {
                type: "in",
                label: "input",
                name: "input",
            },
        ],
        outputs: [],
    },
    display: {
        inputs: [
            {
                type: "in",
                label: "input",
                name: "input",
            },
        ],
        outputs: [],
    },
    API: {
        inputs: [],
        outputs: [
            {
                type: "out",
                label: "out",
                name: "out",
            },
        ],
    },
    SCRIPT: {
        inputs: [
            {
                type: "in",
                label: "Input Data 1",
                name: "input1",
            },
            {
                type: "in",
                label: "Input Data 2",
                name: "input2",
            },
        ],
        outputs: [
            {
                type: "out",
                label: "out",
                name: "out",
            },
        ],
    },
};

export const elements: {
    key: string;
    type: string;
    name: string;
    processor?: string;
    pinMapping: InputOutput;
    initialData?: (node: NodeType) => object;
}[] = [
    // {
    //     key: "add",
    //     type: "add",
    //     name: "Add",
    //     processor: getProcessor("add"),
    //     pinMapping: pinMapping["add"],
    // },
    // {
    //     key: "square",
    //     type: "square",
    //     name: "Square",
    //     processor: getProcessor("square"),
    //     pinMapping: pinMapping["square"],
    // },
    // {
    //     key: "factorial",
    //     type: "factorial",
    //     name: "Factorial",
    //     processor: getProcessor("factorial"),
    //     pinMapping: pinMapping["factorial"],
    // },
    // {
    //     key: "conditional",
    //     type: "conditional",
    //     name: "Conditional",
    //     processor: getProcessor("conditional"),
    //     pinMapping: pinMapping["conditional"],
    // },
    // {
    //     key: "constant",
    //     type: "constant",
    //     name: "Constant",
    //     initialData: () => {
    //         return { value: 4 };
    //     },
    //     processor: getProcessor("constant"),
    //     pinMapping: pinMapping["constant"],
    // },
    // {
    //     key: "regex",
    //     type: "regex",
    //     name: "Regex Match",
    //     processor: getProcessor("regex"),
    //     initialData: () => {
    //         return {
    //             regex: "hey",
    //             flags: "g",
    //         };
    //     },
    //     pinMapping: pinMapping["regex"],
    // },
    // {
    //     key: "console",
    //     type: "sink",
    //     name: "Console",
    //     processor: getProcessor("console"),
    //     pinMapping: pinMapping["console"],
    // },
    {
        key: "display",
        type: "sink",
        name: "Display",
        processor: getProcessor("display"),
        pinMapping: pinMapping["display"],
        initialData: (node: NodeType) => {
            return {
                node: node.id,
            };
        },
    },
];

export const saveElements = (
    items: ElementResponseStructure[]
): { [id: string]: ElementType } => {
    let modified = items.reduce(
        (
            acc: { [id: string]: ElementType },
            element: ElementResponseStructure
        ) => {
            acc[element.id.toString()] = {
                id: element.id.toString(),
                key: element.blockType,
                type: element.blockType,
                name: element.blockName,
                description: element.blockDescription,
                pinMapping: pinMapping[element.blockType],
                processor: getProcessor(element.blockType),
                originalElement: element,
                initialData: ((
                    node: NodeType,
                    el: ElementResponseStructure
                ) => {
                    let data: any = {};
                    if (el.blockType === "API") {
                        data.url = el.url;
                        data.requestType = el.requestType;
                        data.inputJson = el.inputJson || "";
                    } else if (el.blockType === "SCRIPT") {
                        data.inputCode = el.inputCode;
                        data.arguments = "";
                    }
                    return data;
                }).toString(),
            };
            return acc;
        },
        {}
    );
    elements.forEach((el, i) => {
        let id = "static_block_" + i;
        modified[id] = {
            id,
            ...el,
            initialData: el.initialData && el.initialData.toString(),
        };
    });
    localStorage.setItem("elements", JSON.stringify(modified));
    return modified;
};

export const getAllElements = async (): Promise<{
    [id: string]: ElementType;
}> => {
    const elements = localStorage.getItem("elements");
    if (elements) {
        return Promise.resolve(JSON.parse(elements));
    } else {
        return await fetch(
            "https://run.mocky.io/v3/bb51e1c3-ce44-439f-af36-58c7cc37e3d9"
        )
            .then((res) => res.json())
            .then((res: ElementResponseStructure[]) => {
                let modified = saveElements(res);
                return modified;
            });
    }
};

export const getElement = async (type: string): Promise<ElementType> => {
    const elements = localStorage.getItem("elements");
    if (elements) {
        return JSON.parse(elements)[type];
    } else {
        let allElements = await getAllElements();
        return allElements[type];
    }
};

export const getElementProcessor = async (type: string) => {
    return (await getElement(type)).processor;
};
