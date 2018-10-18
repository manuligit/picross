import React, { Component } from 'react';
import './App.css';
import Picross from './Picross'
import Creator from './Creator'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Picross />
      </div>
    );
  }
}

export default App;