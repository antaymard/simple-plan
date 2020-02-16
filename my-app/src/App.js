import React, { useState, useEffect } from 'react';
import { createStore, useStore } from 'react-hookstore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import Sidebar from './components/sidebar/Sidebar.js';
import Login from './components/login/Login.js';
import DashboardPage from './pages/DashboardPage';



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
      {/* MAIN ROUTER */}
      <Router>
        <Sidebar />
        <Switch>
          <Route path='/dashboard/p'>
            <DashboardPage />
          </Route>
          <Route path="/dashboard/p/:id">
            <DashboardPage />
          </Route>
          <Route path='/dashboard/j'>
            <DashboardPage />
          </Route>
          <Route path="/dashboard/j/:id">
            <DashboardPage />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/'>
            {logStatus ? <Redirect to='/dashboard/p/' /> : <Login />}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
