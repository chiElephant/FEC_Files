/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product.jsx';
import '../styles/product-styles.module.css';

function Products({ data }) {
  const [productData, setProductData] = useState(() => {
    if (typeof window !== 'undefined' && window.__INITIAL_DATA__) {
      return window.__INITIAL_DATA__;
    }
    return data;
  });
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get('/products');
      setProductData(res.data);
      setError(null);
    } catch (err) {
      setError(`Error fetching data: ${err}`);
    }
  };

  useEffect(() => {
    if (!productData) {
      fetchData();
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const productElements = productData ? (
    productData.map((item) => <Product key={item.id} {...item} />)
  ) : (
    <div>Loading....🤹</div>
  );

  return (
    <div className="productListParent">
      <div className="product-list">{productElements}</div>
    </div>
  );
}

export default Products;
