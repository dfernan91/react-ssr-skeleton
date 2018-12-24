import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Router} from 'react-router-dom';
import App from './App/App/App';
//module
import 'bootstrap';
import createStore, {defaultState} from "./store";
import {Provider} from "react-redux";
import {browserHistory} from "./browserHistory";


// combine server feched data and default store states
const state = {
    ...defaultState,
    ...window.____storeState_____
}

// Allow the passed state to be garbage-collected
delete window.____storeState_____

const store = createStore(state);

const renderMethod = ReactDOM.render;

renderMethod((
  <Provider store={store}>
      <BrowserRouter>
          <App/>
      </BrowserRouter>
  </Provider>

),document.getElementById('root'));