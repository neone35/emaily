import 'materialize-css/dist/css/materialize.min.css'; //non-js with ext
import 'materialize-css/dist/js/materialize.min.js'; 
import React from "react";
import ReactDOM from "react-dom";
// import registerServiceWorker from "./registerServiceWorker";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import App from "./components/App";
import reducers from "./reducers"; //index.js
// dev helper
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector("#root")
);
// registerServiceWorker();