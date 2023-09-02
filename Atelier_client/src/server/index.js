/* eslint-disable react/jsx-filename-extension */
import express from 'express';
import { renderToString } from 'react-dom/server';
import * as React from 'react';
import serialize from 'serialize-javascript';
import { library, config, dom } from '@fortawesome/fontawesome-svg-core';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

import Products from '../shared/components/Products.jsx';
import Topbar from '../shared/components/Topbar.jsx';
import fetchProducts from '../shared/fetchProducts.js';

const fs = require('fs').promises;
const path = require('path');

const app = express();

// config.autoAddCss = false;
library.add(faStar, faStarHalfAlt, farStar);

app.use(express.static('dist'));

app.get('/Products', async (req, res, next) => {
  console.log(req.url);
  try {
    const data = await fetchProducts();
    const reactApp = renderToString(
      <Products initialProductsDataFromServer={data} />
    );

    const serializedData = serialize(data);

    let html = await fs.readFile(path.resolve('./dist/template.html'), 'utf8');

    const fontAwesomeCss = dom.css();

    html = html.replace(
      '</head>',
      `<style type="text/css">${fontAwesomeCss}</style></head>`
    );

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
