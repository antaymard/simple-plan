import React, { useState, useEffect } from 'react';
import { createStore, useStore } from 'react-hookstore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';

import './App.css';

import Sidebar from './components/sidebar/Sidebar.js';
import DashboardPage from './pages/DashboardPage';
import Modal from './components/modal/Modal.js';
import JobEdit from './components/edit/JobEdit.js';

import moment from 'moment';

moment.locale('fr', {
  months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
  weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'un an',
    yy: '%d ans'
  }
});

moment.locale('fr');

// TO REMOVE
createStore('jobFilterStore', {});
createStore('jobsListStore', []);
createStore('projectsListStore', []);
createStore('logStatusStore', null);

toast.configure({
  autoClose: 2000,
  draggable: false
});

function App() {

  const [logStatus, setLogStatus] = useStore('logStatusStore');
  let location = useLocation();
  let background = location.state && location.state.background;
  let projectId = location.state && location.state.projectId;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLogStatus(true);
    } else {
      setLogStatus(false);
    }
    console.log(logStatus)
  })

  // RENDER THE APP
  return (

    <div className="app">
      {/* MAIN ROUTER */}
      <Sidebar />
      <Switch location={background || location}>
        <Route path='/dashboard/p'>
          <DashboardPage />
        </Route>
        <Route path='/dashboard/j/:id'>
          {/* TODO : Add job view full screen */}
          <JobEdit selectedProject={projectId} />
        </Route>
        <Route path='/'>
          {logStatus === true ? <Redirect to='/dashboard/p/' /> : logStatus === false ? <Redirect to='/login' /> : null}
        </Route>
      </Switch>
      {background && <Route path='/dashboard/j/:id' children={
        <Modal children={<JobEdit selectedProject={projectId} />} />
      } />}
    </div>
  )
}

export default App;
