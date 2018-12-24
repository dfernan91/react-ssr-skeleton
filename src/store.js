import {compose , applyMiddleware} from 'redux';
import {createStore} from 'trim-redux';
import thunk from 'redux-thunk';
import {isBrowser} from "./tools/constant";




export const defaultState = {
    home:null,
};


let composeEnhancer = compose;
// if (JSON.parse(process.env.REACT_APP_REDUX_DEV_TOOLS) && isBrowser)
//     composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default (state = defaultState) => createStore(state, composeEnhancer(applyMiddleware(thunk)));
