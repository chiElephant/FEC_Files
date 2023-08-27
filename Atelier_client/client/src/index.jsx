/* global document */

import React, { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App.jsx';
import Topbar from './components/Topbar.jsx';
import Products from './components/Products.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Topbar />
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/:id" element={<App />} />
    </Routes>
  </BrowserRouter>
);
