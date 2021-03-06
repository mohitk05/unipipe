import { type } from "os";

const processors: { [key: string]: (param: any) => any } = {
    add: ({ input1, input2 }) => {
        console.log(input1, input2);
        return { sum: input1 + input2 };
    },
    square: ({ input }) => {
        return { square: input * input };
    },
    factorial: ({ input }) => {
        const fact = (n: number): number => {
            if (n <= 1) return 1;
            return n * fact(n - 1);
        };
        return { factorial: fact(input) };
    },
    conditional: ({ input1, input2, node }) => {
        const condition = node.data.condition;
        return {
            true: input1 == condition ? input1 : null,
            false: input1 != condition ? input1 : null,
        };
    },
    constant: ({ node }) => ({ constant: node.data.value }),
    regex: ({
        input,
        node: {
            data: { regex, flags },
        },
    }): { matches: string[] } => {
        if (Array.isArray(input)) {
            return {
                matches: input.filter((i) => new RegExp(regex, flags).test(i)),
            };
        } else if (typeof input === "string") {
            return { matches: input.match(new RegExp(regex, flags)) || [] };
        } else {
            return { matches: [] };
        }
    },
    console: ({ input, node, ctx }) => {
        ctx.postMessage({
            type: "update_node",
            node: node.id,
            update: {
                value: input,
            },
        });
        console.log("Result:", input);
    },
    display: async ({ input, node, ctx }) => {
        ctx.postMessage({
            type: "update_node",
            node: node.id,
            update: {
                value: input,
            },
        });
        console.log(input);
    },
    html: async ({ input, node, ctx }) => {
        ctx.postMessage({
            type: "update_node",
            node: node.id,
            update: {
                value: input,
            },
        });
        console.log(input);
    },
    chart: async ({ input, node, ctx }) => {
        ctx.postMessage({
            type: "update_node",
            node: node.id,
            update: {
                value: input,
            },
        });
        console.log(input);
    },
    API: async ({ input, node, ctx }) => {
        let options: {
            method: string;
            headers: any;
            body?: any;
        } = {
            method: node.data.apiType,
            headers: {
                "Content-Type": "application/json; charset=utf8",
                ...node.data.headers,
            },
        };
        if (node.data.apiType === "POST") {
            options.body = JSON.stringify(input) || node.data.inputJson;
        }
        console.log(options);
        return await fetch(node.data.url, options)
            .then((res) => res.json())
            .then((res) => {
                return { out: res };
            })
            .catch((err) => {
                throw Error(err);
            });
    },
    SCRIPT: async ({ input1, input2, node, ctx }) => {
        let parsed1, parsed2;
        if (typeof input1 === "string") {
            try {
                parsed1 = JSON.parse(input1);
            } catch (e) {
                parsed1 = input1;
            }
        } else {
            parsed1 = input1;
        }
        if (typeof input2 === "string") {
            try {
                parsed2 = JSON.parse(input2);
            } catch (e) {
                parsed2 = input2;
            }
        } else {
            parsed2 = input2;
        }
        let combinedInput = {
            input1: parsed1,
            input2: parsed2,
        };
        let body = {
            source: node.data.inputCode,
            input: combinedInput,
        };
        if (!/function \w+\d*\s*\(/.test(body.source)) {
            const output = eval(body.source);
            return { out: output(body.input) };
        } else return { out: {} };
    },
};

export const getProcessor = (type: string) => {
    return processors[type].toString();
};
