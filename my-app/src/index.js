import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


// REDUX MANAGEMENT
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const devTools = process.env.NODE_ENV === 'production' ? null : window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_();

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        devTools
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
