import React from 'react';
import { createStore } from 'react-hookstore';
import './App.css';

import Header from './components/header/Header.js';
import Viewport from './components/viewport/Viewport.js';

createStore('jobFilterStore', {});
createStore('jobsListStore', []);
createStore('projectsListStore', []);

function App() {
  return (
    <div className="app">
      <Header/>
      <Viewport/>
    </div>
  );
}

export default App;
