import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import languageReducer from "./reduxReducers/language-reducer";

const allReducers = combineReducers({
    language: languageReducer
});

const store = createStore(
    allReducers,
    {
        language: 'ge'
    },
    window.devToolsExtension && window.devToolsExtension()
);

const action = {
    type: 'changeState',
    payload: {
        newState: 'New state'
    }
};

store.dispatch(action);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
