import * as React from "react";
import AceEditor from "react-ace";
import "./index.css";

const CodeBox = (props: any) => {
    return (
        <AceEditor
            style={{
                background: "#091E42",
                width: "auto",
                height: 375,
                color: "white",
                caretColor: "white",
            }}
            placeholder="Write your code here"
            mode="javascript"
            name="test"
            onChange={props.onChange}
            fontSize={12}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            value={props.value}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
            }}
        />
    );
};

export default CodeBox;
