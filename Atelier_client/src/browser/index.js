/* eslint-disable no-underscore-dangle */
/* global document */
/* global window */

import * as React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import Products from '../shared/components/Products.jsx';

config.autoAddCss = false;
library.add(faStar, faStarHalfAlt, farStar);

const container = document.getElementById('root');
hydrateRoot(
  container,
  <Products initialProductsDataFromServer={window.__INITIAL_DATA__} />
);
