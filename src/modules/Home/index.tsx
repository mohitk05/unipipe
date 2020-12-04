import * as React from "react";
import ElementList from "./../../components/ElementList";
import Board from "./../../components/Board";

const Home = () => {
    return (
        <div
            style={{
                display: "flex",
                height: "calc(100vh - 64px)",
            }}
        >
            <ElementList />
            <Board />
        </div>
    );
};

export default Home;
