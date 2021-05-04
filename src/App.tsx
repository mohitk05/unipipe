import * as React from "react";
import "./App.css";
import { MainContext, initialState } from "./context/main";
import { main } from "./reducers";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import LandingPage from "./modules/LandingPage";
import Home from "./modules/Home";
import HeaderModule from "./components/Header";

const App: React.FC = () => {
    const storedState = localStorage.getItem("store_state");
    const [state, dispatch] = React.useReducer(
        main,
        (storedState && JSON.parse(storedState)) || initialState
    );
    return (
        <div className="App">
            <MainContext.Provider value={{ state, dispatch }}>
                <Router>
                    <HeaderModule />
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
                    </Switch>
                    {/* <Footer style={{ textAlign: 'center' }}> <img style={{ width: 12, height: 12, transform: 'rotate(90deg)' }} src={Logo} />UNIPIPE  ©2020</Footer> */}
                </Router>
            </MainContext.Provider>
        </div>
    );
};

export default App;
