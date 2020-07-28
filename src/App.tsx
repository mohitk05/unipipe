import React, { useReducer } from 'react';
import './App.css';
import Home from './modules/Home';
import { MainContext, initialState } from './context/main';
import { main } from './reducers';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(main, initialState);
  return (
    <div className="App">
      <MainContext.Provider value={{ state, dispatch }}>
        <Home />
      </MainContext.Provider>
    </div>
  );
}

export default App;
