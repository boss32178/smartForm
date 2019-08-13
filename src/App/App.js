import React from 'react';
import logo from '../logo.svg';
import './App.css';
import SmartForm from '../Component/SmartForm/SmartForm.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Input Components
        </p>
      </header>
      <SmartForm/>
    </div>
  );
}

export default App;
