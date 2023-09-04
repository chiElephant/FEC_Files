import express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import serialize from 'serialize-javascript';
import { matchPath } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import dotenv from 'dotenv';
import routes from '../shared/routes';
import createEmotionCache from '../shared/createEmotionCache';

import App from '../shared/components/App.jsx';

dotenv.config();

const fs = require('fs').promises;
const path = require('path');

const app = express();

app.use(express.static('dist'));

app.get('*', async (req, res, next) => {
  const activeRoute =
    routes.find((route) => matchPath(route.path, req.url)) || {};

  try {
    const data = await activeRoute.fetchInitialData({
      API_KEY: process.env.GIT,
      productId: req.url.substring(1),
    });

    const cache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } =
      createEmotionServer(cache);

    const reactApp = renderToString(
      <CacheProvider value={cache}>
        <CssBaseline />
        <StaticRouter location={req.url}>
          <App serverData={data} />
        </StaticRouter>
      </CacheProvider>
    );

    const emotionChunks = extractCriticalToChunks(reactApp);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);

    const serializedData = serialize(data);

    let html = await fs.readFile(path.resolve('./dist/template.html'), 'utf8');

    html = html.replace('</head>', `<style>${emotionCss}</style></head>`);

    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${reactApp}</div>`
    );

    html = html.replace(
      '<script>window.__INITIAL_DATA__ = null;</script>',
      `<script>window.__INITIAL_DATA__ = ${serializedData};</script>`
    );

    res.send(html);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.log('error in express error handler: ', err.message);
  res.status(500).send({ error: err.message });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
