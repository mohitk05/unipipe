import * as React from "react";
import ElementList from "./../../components/ElementList";
import Board from "./../../components/Board";
import PropertiesPanel from "./../../components/PropertiesPanel";
import "./index.css";

const Home = () => {
    return (
        <div className="main">
            <ElementList />
            <Board />
            {/* <PropertiesPanel /> */}
        </div>
    );
};

export default Home;
