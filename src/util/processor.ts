const processors: { [key: string]: (param: any) => any } = {
    add: ({ input1, input2 }) => {
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
    API: async ({ node, ctx }) => {
        let body = {
            apiType: node.data.requestType,
            url: node.data.url,
            headers: node.data.headers,
            json: node.data.requestType === "POST" && node.data.inputJson,
        };
        return await fetch(
            "https://run.mocky.io/v3/f84df4fa-58b2-45f8-94c0-b13c5a50e5eb",
            {
                method: "POST",
                body: JSON.stringify(body),
            }
        )
            .then((res) => res.json())
            .then((res) => {
                return { out: res.data };
            });
    },
    SCRIPT: async ({ input1, input2, node, ctx }) => {
        let body = {
            inputCode: node.data.inputCode,
            arguments: input1,
        };
        return await fetch(
            "https://run.mocky.io/v3/f84df4fa-58b2-45f8-94c0-b13c5a50e5eb",
            {
                method: "POST",
                body: JSON.stringify(body),
            }
        )
            .then((res) => res.json())
            .then((res) => {
                return { out: res.data };
            });
    },
};

export const getProcessor = (type: string) => {
    return processors[type].toString();
};
