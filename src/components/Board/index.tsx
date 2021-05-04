import * as React from "react";
import Node from "./../Node";
import { MainContext } from "../../context/main";
import Connector from "../Connector";

const { useContext } = React;
const Board = () => {
    const {
        state: { board },
    } = useContext(MainContext);
    const { nodes, inputPins, outputPins } = board;
    return (
        <div style={styles.board}>
            {nodes?.length == 0 && <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                        <path d="M65.614 62.908C64.2138 63.3946 62.942 64.1919 61.8939 65.2402C60.8458 66.2885 60.0487 67.5605 59.5624 68.9608L57.7231 74.2536C57.7111 74.2943 57.6863 74.3299 57.6523 74.3553C57.6184 74.3807 57.5771 74.3943 57.5347 74.3943C57.4924 74.3943 57.4511 74.3807 57.4172 74.3553C57.3832 74.3299 57.3584 74.2943 57.3464 74.2536L55.5116 68.9608C55.0248 67.56 54.227 66.2877 53.1781 65.2394C52.1292 64.1911 50.8565 63.394 49.4555 62.908L44.1652 61.0694C44.1267 61.0561 44.0932 61.031 44.0696 60.9977C44.0459 60.9645 44.0332 60.9247 44.0332 60.8839C44.0332 60.8431 44.0459 60.8034 44.0696 60.7701C44.0932 60.7369 44.1267 60.7118 44.1652 60.6984L49.4555 58.8599C50.8565 58.3739 52.1292 57.5769 53.1781 56.5286C54.227 55.4803 55.0248 54.2079 55.5116 52.8071L57.3464 47.5143C57.3584 47.4736 57.3832 47.4379 57.4172 47.4126C57.4511 47.3872 57.4924 47.3735 57.5347 47.3735C57.5771 47.3735 57.6184 47.3872 57.6523 47.4126C57.6863 47.4379 57.7111 47.4736 57.7231 47.5143L59.5624 52.8071C60.0487 54.2074 60.8458 55.4794 61.8939 56.5277C62.942 57.5759 64.2138 58.3733 65.614 58.8599L70.9088 60.6984C70.9473 60.7118 70.9807 60.7369 71.0044 60.7701C71.0281 60.8034 71.0408 60.8431 71.0408 60.8839C71.0408 60.9247 71.0281 60.9645 71.0044 60.9977C70.9807 61.031 70.9473 61.0561 70.9088 61.0694L65.614 62.908Z" fill="#F6C24C" />
                        <path d="M69.8877 25.0152C68.1373 25.6233 66.5473 26.62 65.2371 27.9303C63.9268 29.2406 62.9303 30.8306 62.3223 32.5811L60.0238 39.1973C60.0076 39.2464 59.9764 39.289 59.9345 39.3194C59.8927 39.3497 59.8423 39.3661 59.7906 39.3661C59.7389 39.3661 59.6886 39.3497 59.6467 39.3194C59.6048 39.289 59.5736 39.2464 59.5574 39.1973L57.2589 32.5811C56.6508 30.8305 55.6542 29.2404 54.3438 27.9301C53.0333 26.6198 51.4432 25.6232 49.6926 25.0152L43.0769 22.717C43.0288 22.7003 42.987 22.669 42.9575 22.6274C42.928 22.5859 42.9121 22.5361 42.9121 22.4852C42.9121 22.4342 42.928 22.3847 42.9575 22.3431C42.987 22.3016 43.0288 22.2701 43.0769 22.2533L49.6926 19.9552C51.4432 19.3472 53.0333 18.3508 54.3438 17.0405C55.6542 15.7301 56.6508 14.14 57.2589 12.3895L59.5574 5.77328C59.5736 5.72417 59.6048 5.68132 59.6467 5.65101C59.6886 5.6207 59.7389 5.60449 59.7906 5.60449C59.8423 5.60449 59.8927 5.6207 59.9345 5.65101C59.9764 5.68132 60.0076 5.72417 60.0238 5.77328L62.3223 12.3895C62.9303 14.1399 63.9268 15.7299 65.2371 17.0403C66.5473 18.3506 68.1373 19.3471 69.8877 19.9552L76.5034 22.2533C76.5516 22.2701 76.5933 22.3016 76.6228 22.3431C76.6523 22.3847 76.6682 22.4342 76.6682 22.4852C76.6682 22.5361 76.6523 22.5859 76.6228 22.6274C76.5933 22.669 76.5516 22.7003 76.5034 22.717L69.8877 25.0152Z" fill="#F6C24C" />
                        <path d="M40.799 45.6578C38.368 46.5024 36.1598 47.8865 34.3401 49.7065C32.5204 51.5264 31.1364 53.7349 30.292 56.166L27.0985 65.3551C27.0757 65.4226 27.0322 65.481 26.9743 65.5225C26.9164 65.5641 26.8469 65.5866 26.7757 65.5866C26.7044 65.5866 26.635 65.5641 26.5771 65.5225C26.5191 65.481 26.4757 65.4226 26.4528 65.3551L23.2593 56.166C22.4149 53.7349 21.031 51.5264 19.2113 49.7065C17.3916 47.8865 15.1834 46.5024 12.7524 45.6578L3.56283 42.4659C3.49598 42.4426 3.43803 42.399 3.39703 42.3413C3.35602 42.2836 3.33398 42.2146 3.33398 42.1439C3.33398 42.0731 3.35602 42.0041 3.39703 41.9464C3.43803 41.8887 3.49598 41.8451 3.56283 41.8219L12.7524 38.63C15.1834 37.7853 17.3916 36.4012 19.2113 34.5813C21.031 32.7614 22.4149 30.5529 23.2593 28.1217L26.4528 18.9326C26.4757 18.8651 26.5191 18.8067 26.5771 18.7652C26.635 18.7237 26.7044 18.7012 26.7757 18.7012C26.8469 18.7012 26.9164 18.7237 26.9743 18.7652C27.0322 18.8067 27.0757 18.8651 27.0985 18.9326L30.292 28.1217C31.1364 30.5529 32.5204 32.7614 34.3401 34.5813C36.1598 36.4012 38.368 37.7853 40.799 38.63L49.9885 41.8219C50.0554 41.8451 50.1133 41.8887 50.1543 41.9464C50.1953 42.0041 50.2174 42.0731 50.2174 42.1439C50.2174 42.2146 50.1953 42.2836 50.1543 42.3413C50.1133 42.399 50.0554 42.4426 49.9885 42.4659L40.799 45.6578Z" fill="#F6C24C" />
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect width="80" height="100" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <span style={{ fontSize: 24, lineHeight: '130%', color: '#45526C', marginBottom: 22, marginTop: 10 }}>Looks squeaky clean in here</span>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    &nbsp;To get started, add a&nbsp;
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 89, height: 36, background: '#FFFFFF', boxShadow: ' 0px 0px 4px rgba(51, 54, 68, 0.05), 0px 2px 6px rgba(51, 54, 68, 0.1)', borderRadius: 8 }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.33 2H16.66C20.06 2 22 3.92 22 7.33V16.67C22 20.06 20.07 22 16.67 22H7.33C3.92 22 2 20.06 2 16.67V7.33C2 3.92 3.92 2 7.33 2ZM12.8201 12.8301H15.6601C16.1201 12.8201 16.4901 12.4501 16.4901 11.9901C16.4901 11.5301 16.1201 11.1601 15.6601 11.1601H12.8201V8.34007C12.8201 7.88007 12.4501 7.51007 11.9901 7.51007C11.5301 7.51007 11.1601 7.88007 11.1601 8.34007V11.1601H8.33013C8.11013 11.1601 7.90013 11.2501 7.74013 11.4001C7.59013 11.5601 7.50013 11.7691 7.50013 11.9901C7.50013 12.4501 7.87013 12.8201 8.33013 12.8301H11.1601V15.6601C11.1601 16.1201 11.5301 16.4901 11.9901 16.4901C12.4501 16.4901 12.8201 16.1201 12.8201 15.6601V12.8301Z" fill="#7C8698" />
                    </svg>&nbsp;Block</div>
                    &nbsp;or explore pre-made&nbsp;
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 89, height: 36, background: '#FFFFFF', boxShadow: ' 0px 0px 4px rgba(51, 54, 68, 0.05), 0px 2px 6px rgba(51, 54, 68, 0.1)', borderRadius: 8 }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.78268 1.6665H6.59935C7.77435 1.6665 8.71602 2.62484 8.71602 3.80067V6.6415C8.71602 7.82484 7.77435 8.77484 6.59935 8.77484H3.78268C2.61602 8.77484 1.66602 7.82484 1.66602 6.6415V3.80067C1.66602 2.62484 2.61602 1.6665 3.78268 1.6665ZM3.78268 11.2246H6.59935C7.77435 11.2246 8.71602 12.1754 8.71602 13.3588V16.1996C8.71602 17.3746 7.77435 18.3329 6.59935 18.3329H3.78268C2.61602 18.3329 1.66602 17.3746 1.66602 16.1996V13.3588C1.66602 12.1754 2.61602 11.2246 3.78268 11.2246ZM16.2161 1.6665H13.3994C12.2244 1.6665 11.2827 2.62484 11.2827 3.80067V6.6415C11.2827 7.82484 12.2244 8.77484 13.3994 8.77484H16.2161C17.3827 8.77484 18.3327 7.82484 18.3327 6.6415V3.80067C18.3327 2.62484 17.3827 1.6665 16.2161 1.6665ZM13.3994 11.2246H16.2161C17.3827 11.2246 18.3327 12.1754 18.3327 13.3588V16.1996C18.3327 17.3746 17.3827 18.3329 16.2161 18.3329H13.3994C12.2244 18.3329 11.2827 17.3746 11.2827 16.1996V13.3588C11.2827 12.1754 12.2244 11.2246 13.3994 11.2246Z" fill="#7C8698" />
                    </svg>&nbsp;Flows</div>
                </span>
            </div>}
            {nodes &&
                nodes.map((node) => {
                    return <Node key={node.id} data={node} />;
                })}
            <svg style={styles.svgParent}>
                {outputPins &&
                    Object.keys(outputPins).map((key) => {
                        return (
                            <>
                                {outputPins[key].refs.map((ref) => {
                                    if (inputPins) {
                                        const inputPin = inputPins[ref];
                                        return (
                                            <Connector
                                                key={ref}
                                                from={outputPins[key]}
                                                to={inputPin}
                                            />
                                        );
                                    } else return null;
                                })}
                            </>
                        );
                    })}
            </svg>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    board: {
        padding: 16,
        width: "100%",
        position: "relative",
        overflow: "scroll",
    },
    svgParent: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 1,
    },
};

export default Board;
