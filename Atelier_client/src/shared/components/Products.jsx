/* global localStorage */

import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Product from './Product.jsx';
// import Loading from './Loading.jsx';
import '../styles/product-styles.module.css';

const initialProductData = {
  id: null,
  campus: null,
  name: null,
  slogan: null,
  description: null,
  category: null,
  created_at: null,
  updated_at: null,
  defaultPrice: null,
  photo: null,
  ratingAverage: null,
  reviewsCount: null,
  features: [],
  styles: [],
};

function Products({ initialProductsDataFromServer }) {
  const [domLoaded, setDomLoaded] = useState(false);

  console.log('test');

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const productElements = initialProductsDataFromServer.map((item) => (
    <Product key={item.id} {...item} />
  ));
  return (
    <>
      {domLoaded && (
        <div className="productListParent">
          <div className="product-list">{productElements}</div>
        </div>
      )}
    </>
  );
}

export default Products;
