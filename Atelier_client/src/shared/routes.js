import Products from './components/Products.jsx';
import ProductPage from './components/ProductPage.jsx';

const routes = [
  {
    path: '/',
    component: Products,
  },
  {
    path: '/:id',
    component: ProductPage,
  },
];

export default routes;
