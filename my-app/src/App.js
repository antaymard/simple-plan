import React, { useState, useEffect } from 'react';
import { createStore, useStore } from 'react-hookstore';
import './App.css';

import Header from './components/header/Header.js';
import Viewport from './components/viewport/Viewport.js';
import Login from './components/login/Login.js';

createStore('jobFilterStore', {});
createStore('jobsListStore', []);
createStore('projectsListStore', []);
createStore('logStatusStore', false);

function App() {

  const [ logStatus, setLogStatus ] = useStore('logStatusStore');  

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLogStatus(true);
    }
  })

  if (logStatus) {
    return (
      <div className="app">
        <Header/>
        <Viewport/>
      </div>
    );  
  } 
  else if (!logStatus) {
    return (
      <>
        <Login/>
      </>
    )
  }
}

export default App;
