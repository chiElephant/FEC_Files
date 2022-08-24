import React, { useState, useEffect } from 'react';
import QandAModule from './questions_answers_module/QandAModule.jsx';

function App(props) {
  return (
    <div>
      <h1> The RedBean Atelier App </h1>
      <QandAModule />
    </div>
  );
}

export default App;
