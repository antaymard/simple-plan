import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';


// REDUX MANAGEMENT
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/signup'>
                    <Signup />
                </Route>
                <Route path='/'>
                    <App />
                </Route>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
