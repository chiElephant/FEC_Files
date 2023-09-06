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
  const [loading, setLoading] = useState(productData ? false : true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get('/products');
      setProductData(res.data);
      setLoading(false);
    } catch (err) {
      setError(`Error fetching data: ${err}`);
    }
  };

  useEffect(() => {
    if (loading) {
      fetchData();
    }
  }, []);

  const resetProductData = () => {
    window.__INITIAL_DATA__ = null;
    setProductData(null);
    setLoading(true);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading....🤹</div>;
  }

  return (
    <div className="product-list">
      {productData.map((item) => (
        <Product key={item.id} {...item} resetProductData={resetProductData} />
      ))}
    </div>
  );
}

export default Products;
