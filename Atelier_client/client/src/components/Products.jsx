import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  const { id } = useParams();

  const fetchProductsData = async (url) => {
    try {
      const response = await axios.get(url);
      const newData = response.data;

      // Check if localStorage is nearing its limit
      const localStorageSize = JSON.stringify(localStorage).length;
      const remainingSize = 5 * 1024 * 1024 - localStorageSize;

      if (remainingSize < JSON.stringify(newData).length) {
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
    let url;
    if (id) {
      url = `/products/${id}/related`;
    } else {
      url = '/products';
    }
    // check if data already exists in local storage
    const savedData = JSON.parse(localStorage.getItem(url));
    if (savedData) {
      setProductsData(savedData);
      setIsLoading(false);
    } else {
      fetchProductsData(url);
    }
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const productElements = productsData.map((item) => (
    <Product key={item.id} {...item} />
  ));

  let content;
  if (id) {
    content = (
      <div id="QandA-main">
        <h1 id="qanda-header">Related Products</h1>
        <div className="product-list-product-page">{productElements}</div>
      </div>
    );
  } else {
    content = (
      <div className="product-list-parent">
        <div className="product-list">{productElements}</div>
      </div>
    );
  }

  return content;
}

export default Products;
