import React, { useState, useEffect } from 'react';
import { createStore, useStore } from 'react-hookstore';
import { ToastContainer, toast } from 'react-toastify';
import Calendar from 'react-calendar';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Sidebar from './components/sidebar/Sidebar.js';
import Login from './components/login/Login.js';
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
        <Sidebar />
        <div className="row viewport">
          <div className='col-2 viewport-left fullHeight'>
            <Calendar
              value={new Date()}
              formatShortWeekday={(locale, value) => ['D', 'L', 'M', 'M', 'J', 'V', 'S'][value.getDay()]}
              formatMonth={(local, value) => ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'][value.getMonth()]}
              next2Label={null}
              prev2Label={null}
              showWeekNumbers
            />
            <ProjectsContainer />
          </div>
          <div className='col-10 viewport-right fullHeight'>
            <Router>
              <Switch>
                {routes.map(route => (
                  <Route key={route.name} {...route} />
                ))}
              </Switch>
            </Router>
          </div>
        </div>
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
