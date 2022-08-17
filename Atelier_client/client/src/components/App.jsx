<<<<<<< HEAD
import React from 'react';
import Overview from './Overview.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1
    };
  }

  render() {
    return (
      <div>
        <h1> The RedBean Atelier App </h1>
        <Overview />
      </div>
    )
  }
=======
import React, { useState, useEffect } from 'react';

function App (props) {
  return (
    <div>
      <h1> The RedBean Atelier App </h1>
    </div>
  )
>>>>>>> master
}

export default App;