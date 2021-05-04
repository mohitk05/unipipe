import * as React from "react";
import { Controlled as CodeMirror } from 'react-codemirror2'
import "./index.css";
require('codemirror/mode/javascript/javascript');

const CodeBox = (props: { value: string, onChange: (data: string) => void }) => {
    return (
        <CodeMirror
            value={props.value}
            options={{
                mode: 'javascript',
                theme: 'material',
                lineNumbers: true
            }}
            onBeforeChange={(editor, data, value) => {
                props.onChange && props.onChange(value);
            }}
        />
        // <AceEditor
        //     style={{
        //         width: "auto",
        //         height: 375,
        //     }}
        //     placeholder="Write your code here"
        //     mode="javascript"
        //     name="test"
        //     onChange={props.onChange}
        //     fontSize={12}
        //     showPrintMargin={false}
        //     showGutter={true}
        //     highlightActiveLine={true}
        //     value={props.value}
        //     setOptions={{
        //         enableBasicAutocompletion: true,
        //         enableLiveAutocompletion: true,
        //         enableSnippets: true,
        //         showLineNumbers: true,
        //         tabSize: 2,
        //     }}
        // />
    );
};

export default CodeBox;
