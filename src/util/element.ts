import { getProcessor } from "./processor";
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
    html: {
        inputs: [
            {
                type: "in",
                label: "input",
                name: "input",
            },
        ],
        outputs: [],
    },
    chart: {
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
        inputs: [
            {
                type: "in",
                label: "Body",
                name: "input",
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
    description: string;
}[] = [
    {
        key: "add",
        type: "add",
        name: "Add",
        description: `<p>Add two values as per JavaScript addition.</p>
        <p>Inputs: </p>
        <ul>
        <li><code>input1 : number | string</code></li>
        <li><code>input2 : number | string</code></li>
        </ul>
        <p>Output:</p>
        <ul>
        <li><code>sum : number | string</code></li>
        </ul>
        `,
        processor: getProcessor("add"),
        pinMapping: pinMapping["add"],
    },
    {
        key: "square",
        type: "square",
        name: "Square",
        description: "Squares a number",
        processor: getProcessor("square"),
        pinMapping: pinMapping["square"],
    },
    {
        key: "factorial",
        type: "factorial",
        name: "Factorial",
        description: "Factorial of a number",
        processor: getProcessor("factorial"),
        pinMapping: pinMapping["factorial"],
    },
    {
        key: "conditional",
        type: "conditional",
        name: "Conditional",
        description: "If-Else operator",
        processor: getProcessor("conditional"),
        pinMapping: pinMapping["conditional"],
        initialData: () => {
            return { condition: 5 };
        },
    },
    {
        key: "constant",
        type: "constant",
        name: "Constant",
        initialData: () => {
            return { value: "" };
        },
        processor: getProcessor("constant"),
        pinMapping: pinMapping["constant"],
        description: "Provides a constant value at its output",
    },
    {
        key: "regex",
        type: "regex",
        name: "Regex Match",
        description: "Matches regex for input",
        processor: getProcessor("regex"),
        initialData: () => {
            return {
                regex: "hey",
                flags: "g",
            };
        },
        pinMapping: pinMapping["regex"],
    },
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
        description: "Displays the value of the input provided",
    },
    {
        key: "html",
        type: "sink",
        name: "HTML Output",
        processor: getProcessor("html"),
        pinMapping: pinMapping["html"],
        initialData: (node: NodeType) => {
            return {
                node: node.id,
            };
        },
        description: "Renders the HTML provided as input",
    },
    {
        key: "chart",
        type: "sink",
        name: "Chart Output",
        processor: getProcessor("chart"),
        pinMapping: pinMapping["chart"],
        initialData: (node: NodeType) => {
            return {
                node: node.id,
            };
        },
        description: "Renders the Chart provided as input",
    },
];

const sampleElements = [
    {
        id: 1,
        blockType: "API",
        apiType: "GET",
        url: "https://example.com",
        blockName: "API Block",
        blockDescription:
            "This block fires an API as specified in the properties",
        inputJson: null,
        inputImageUrl: null,
        outputImageUrl: null,
        inputCode: null,
        arguments: null,
    },
    {
        id: 2,
        blockType: "SCRIPT",
        apiType: "GET",
        url: "https://example.com",
        blockName: "Custom Script",
        blockDescription:
            "This block fires an API as specified in the properties",
        inputJson: null,
        inputImageUrl: null,
        outputImageUrl: null,
        inputCode: `({ input1, input2 }) => {
    return input1;
}`,
        arguments: null,
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
                        data.apiType = el.apiType;
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
        let modified = saveElements(sampleElements);
        return modified;
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
