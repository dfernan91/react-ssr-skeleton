import {compose , applyMiddleware} from 'redux';
import {createStore} from 'trim-redux';
import thunk from 'redux-thunk';
import {isBrowser} from "./src/tools/constant";


export const defaultState = {
    home : '',
};

let composerEnhancer = compose;
if(JSON.parse(process.env.REACT_APP_REDUX_DEV_TOOLS) && isBrowser)
    composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;







export default (state = defaultState) => createStore(state, composerEnhancer(applyMiddleware(thunk)));
