import * as React from "react";
import "./App.css";
import { MainContext, initialState } from "./context/main";
import { main } from "./reducers";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
} from "react-router-dom";

import PageNotFound from "./assets/PageNotFound.jpg";

import LandingPage from "./modules/LandingPage";
import Home from "./modules/Home";
import HeaderModule from "./components/Header";

import { Layout } from "antd";

const App: React.FC = () => {
    const { Content, Footer } = Layout;
    const storedState = localStorage.getItem("store_state");
    const [state, dispatch] = React.useReducer(
        main,
        (storedState && JSON.parse(storedState)) || initialState
    );
    return (
        <div className="App">
            <MainContext.Provider value={{ state, dispatch }}>
                <Router>
                    <Layout className="layout">
                        <HeaderModule />
                        <Content>
                            <Switch>
                                <Route path="/home/:id">
                                    <Home />
                                </Route>
                                <Route exact path="/home">
                                    <Redirect to="/home/new" />
                                </Route>
                                <Route exact path="/">
                                    <LandingPage />
                                </Route>
                                <Route path="*">
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <img src={PageNotFound} />
                                    </div>
                                </Route>
                            </Switch>
                        </Content>
                        {/* <Footer style={{ textAlign: 'center' }}> <img style={{ width: 12, height: 12, transform: 'rotate(90deg)' }} src={Logo} />UNIPIPE  ©2020</Footer> */}
                    </Layout>
                </Router>
            </MainContext.Provider>
        </div>
    );
};

export default App;
