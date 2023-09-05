import Products from './components/Products.jsx';
import ProductPage from './components/ProductPage.jsx';

import fetchProducts from './fetchProducts.js';
import fetchProduct from './fetchProduct.js';

const serverRoutes = [
  {
    path: '/',
    component: Products,
    fetchInitialData: fetchProducts,
  },
  {
    path: '/:id',
    component: ProductPage,
    fetchInitialData: fetchProduct,
  },
];

export default serverRoutes;
