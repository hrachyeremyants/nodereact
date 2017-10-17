import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import App from './App';
import cacheManager from 'services/cacheManager';
import * as reducers from './store/reducers';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers(reducers),
    composeEnhancers(applyMiddleware(thunk))
);

cacheManager.setVersion("0.0.2");

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route  path={'/'} component={ App }/>
        </Router>
    </Provider>,
    document.getElementById('root')
);