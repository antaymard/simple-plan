import React, { useState, useEffect } from 'react';
import { createStore, useStore } from 'react-hookstore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import Header from './components/header/Header.js';
import Viewport from './components/viewport/Viewport.js';
import Login from './components/login/Login.js';

createStore('jobFilterStore', {});
createStore('jobsListStore', []);
createStore('projectsListStore', []);
createStore('logStatusStore', false);

toast.configure({
  autoClose : 8000,
  draggable : false
});

function App() {

  const [ logStatus, setLogStatus ] = useStore('logStatusStore');  

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLogStatus(true);
    }
  })

  return (
    <div className="app">
      {logStatus ? <><Header/><Viewport/></> : <Login/>}
      <ToastContainer/>
    </div>
  )
}

export default App;
