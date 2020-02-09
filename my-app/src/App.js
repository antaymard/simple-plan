import React, { useState, useEffect } from 'react';
import { createStore, useStore } from 'react-hookstore';
import { ToastContainer, toast } from 'react-toastify';
import Calendar from 'react-calendar'; // REMOVE
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Sidebar from './components/sidebar/Sidebar.js';
import Login from './components/login/Login.js';

// REMOVE
import ProjectsContainer from './components/projectsContainer/ProjectsContainer.js';

import routes from './routes/routes';

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
  })

  // RENDER THE APP
  if (logStatus) {
    return (
      <div className="app">
        <Router>
          <Sidebar />
          <Switch>
            {routes.map(route => (
              <Route key={route.name} {...route} />
            ))}
          </Switch>
        </Router>
        <ToastContainer />
      </div>
    )
  }
  // RENDER LOGIN PAGE 
  else {
    return (
      <div className="app">
        <Login />
      </div>
    )
  }

}

export default App;
