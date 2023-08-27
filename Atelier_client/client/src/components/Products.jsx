/* global localStorage */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product.jsx';
import Loading from './Loading.jsx';

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

function Products() {
  const [productsData, setProductsData] = useState([initialProductData]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductsData = async (url) => {
    try {
      const response = await axios.get(url);
      const newData = response.data;

      const newDataSize = JSON.stringify(newData).length;

      const localStorageSize = JSON.stringify(localStorage).length;
      const remainingSize = 5 * 1024 * 1024 - localStorageSize;

      if (remainingSize < newDataSize) {
        localStorage.clear();
      }

      localStorage.setItem(url, JSON.stringify(newData));
      setProductsData(newData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('/products'));
    if (savedData) {
      setProductsData(savedData);
      setIsLoading(false);
    } else {
      fetchProductsData('/products');
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const productElements = productsData.map((item) => (
    <Product key={item.id} {...item} />
  ));

  return (
    <div className="product-list-parent">
      <div className="product-list">{productElements}</div>
    </div>
  );
}

export default Products;
