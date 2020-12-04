import * as React from 'react';
import './App.css';
import { MainContext, initialState } from './context/main';
import { main } from './reducers';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import PageNotFound from './assets/PageNotFound.jpg'

import LandingPage from './modules/LandingPage';
import Home from './modules/Home'

const App: React.FC = () => {
  const storedState = localStorage.getItem('store_state');
  const [state, dispatch] = React.useReducer(main, (storedState && JSON.parse(storedState)) || initialState);
  return (
    <div className="App">
      <MainContext.Provider value={{ state, dispatch }}>
        <Router>
          <Switch>
            <Route path='/home/:id'>
              <Home />
            </Route>
            <Route exact path='/home'>
              <Redirect to='/home/new' />
            </Route>
            <Route exact path='/'>
              <LandingPage />
            </Route>
            <Route path='*'>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={PageNotFound} />
              </div>
            </Route>
          </Switch>
        </Router>
      </MainContext.Provider>
    </div>
  );
}

export default App;
