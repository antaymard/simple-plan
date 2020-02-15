import React, { useState, useEffect } from 'react';
import { createStore, useStore } from 'react-hookstore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import Sidebar from './components/sidebar/Sidebar.js';
import Login from './components/login/Login.js';
import DashboardPage from './pages/DashboardPage';

import routes from './routes/routes'; // TO REMOVE



// TO REMOVE
createStore('jobFilterStore', {});
createStore('jobsListStore', []);
createStore('projectsListStore', []);
createStore('logStatusStore', false);

toast.configure({
  autoClose: 8000,
  draggable: false
});

function App() {

  const [logStatus, setLogStatus] = useStore('logStatusStore');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLogStatus(true);
    }
    console.log(logStatus)
  })

  // RENDER THE APP
  return (

    <div className="app">
      <Router>
        <Sidebar />
        <Switch>
          <Route path='/' exact>
            {logStatus ? <Redirect to='/dashboard' /> : <Login />}
          </Route>
          <Route path='/dashboard'>
            <DashboardPage />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
