/* global document */

import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import App from './components/App.jsx';
=======
import App from './components/App';
>>>>>>> master

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(<App />);

console.log('test: ', root);
