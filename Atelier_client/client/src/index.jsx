/* global document */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar.jsx';
import App from './components/App.jsx';

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Topbar />} />
      <Route path="/:id" element={<App />} />
    </Routes>
  </BrowserRouter>
);
