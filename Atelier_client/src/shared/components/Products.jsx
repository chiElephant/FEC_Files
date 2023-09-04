/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import Product from './Product.jsx';
import '../styles/product-styles.module.css';

function Products({ data, fetchInitialData }) {
  const [productData, setProductData] = useState(() => {
    if (typeof window !== 'undefined' && window.__INITIAL_DATA__) {
      return window.__INITIAL_DATA__;
    }
    return data;
  });

  const fetchData = async () => {
    const res = await fetchInitialData({
      API_KEY: CLIENT_API_KEY || '',
    });
    setProductData(res);
  };

  useEffect(() => {
    if (!productData) {
      fetchData();
    }
  }, []);

  const productElements = productData
    ? productData.map((item) => <Product key={item.id} {...item} />)
    : 'Loading...';

  return (
    <div className="productListParent">
      <div className="product-list">{productElements}</div>
    </div>
  );
}

export default Products;
