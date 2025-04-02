/* eslint-disable no-underscore-dangle */
/* global document */

import * as React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../shared/createEmotionCache';
import CssBaseline from '@mui/material/CssBaseline';

import App from '../shared/components/App.jsx';

const cache = createEmotionCache();

const container = document.getElementById('root');
hydrateRoot(
  container,
  <CacheProvider value={cache}>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CacheProvider>
);
