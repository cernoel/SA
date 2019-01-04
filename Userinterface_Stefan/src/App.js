import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Favorite from './component/favorites';

class App extends Component {
   
  
  state = {
    
    search_array: [
      { name: 'enter name', category: 'enter category', poid: '', distance: '100', id: '1' }
    ],
    favorites: [{ name: '', category: '', poid: '', id: 1 }]
  
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
