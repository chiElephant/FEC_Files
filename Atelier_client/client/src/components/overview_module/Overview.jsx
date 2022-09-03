/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
// import {
//   list_product,
//   product_information,
//   product_styles,
//   related_products,
//   product_reviews,
// } from '../../../example_data/example.js';
import axios from 'axios';
import ProductInfo from './ProductInfo.jsx';
import Styles from './Styles.jsx';

function Overview(props) {
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState({
    product_id: '',
    results: [
      {
        style_id: 1,
        name: '',
        original_price: '',
        sale_price: 0,
        default: true,
        photos: [
          {
            thumbnail_url: '',
            url: '',
          },
        ],
        skus: {},
      },
    ],
  });
  const [selectedStyle, setSelectedStyle] = useState({});

  useEffect(() => {
    axios.get(`/products/${props.product_id}`).then((data) => {
      // console.log(data.data);
      setProduct(data.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/products/${props.product_id}/styles`).then((data) => {
      // console.log(data.data);
      setStyles(data.data);
    });
    axios.get(`/products/${props.product_id}`).then((data) => {
      console.log(data.data);
      setProduct(data.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/products/${props.product_id}/styles`).then((data) => {
      console.log(data.data);
      setStyles(data.data);
    });
  }, []);

  const changeStyleSelected = (style) => {
    console.log(`The selected style is: ${style}`);
    setSelectedStyle(style);
  };

  if (Object.keys(product).length) {
    return (
      <div>
        <ProductInfo
          product_id={props.product_id}
          product={product}
          features={product.features}
          style={selectedStyle}
          styles={styles}
        />
        <Styles
          product={product}
          styles={styles.results}
          changeStyleSelected={changeStyleSelected}
        />
      </div>
    );
  }
}

export default Overview;
