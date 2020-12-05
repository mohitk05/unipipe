import * as React from "react";
import AceEditor from "react-ace";

const CodeBox = (props: any) => {
    const [code, setCode] = React.useState("");

    function handleChange(params: any) {
        setCode(params);
    }

    return (
        <div style={{ padding: 10 }}>
            <AceEditor
                placeholder="Write your code here"
                mode="javascript"
                name="test"
                onChange={handleChange}
                fontSize={12}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={code}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
            />
        </div>
    );
};

export default CodeBox;
