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

import Home from "./modules/Home";
import HeaderModule from "./components/Header";

const App: React.FC = () => {
    const [state, dispatch] = React.useReducer(
        main,
        initialState
    );
    return (
        <div className="App">
            <MainContext.Provider value={{ state, dispatch }}>
                <Router basename="/unipipe">
                    <HeaderModule />
                    <Switch>
                        <Route path="/home/:id">
                            <Home />
                        </Route>
                        <Redirect from="*" to="/home/new" />
                    </Switch>
                    {/* <Footer style={{ textAlign: 'center' }}> <img style={{ width: 12, height: 12, transform: 'rotate(90deg)' }} src={Logo} />UNIPIPE  ©2020</Footer> */}
                </Router>
            </MainContext.Provider>
        </div>
    );
};

export default App;
