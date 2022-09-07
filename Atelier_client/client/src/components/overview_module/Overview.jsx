/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductInfo from './ProductInfo.jsx';
import Styles from './Styles.jsx';

// 71697
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
  const [selectedStyle, setSelectedStyle] = useState({
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
  });

  useEffect(() => {
    axios.get(`/products/${props.product_id}`).then((data) => {
      // console.log(data.data);
      setProduct(data.data);
    });
    axios.get(`/products/${props.product_id}/styles`).then((data) => {
      // console.log(data.data);
      setStyles(data.data);
    });
    axios.get(`/products/${props.product_id}/styles`).then((data) => {
      console.log(data.data);
      setStyles(data.data);
    });
  }, []);

  useEffect(() => {
    let def = {};
    for (let i = 0; i < styles.results.length; i++) {
      if (styles.results[i]['default?']) {
        def = styles.results[i];
        styles.results.splice(i, 1);
        styles.results.unshift(def);
      }
    }
    setSelectedStyle(def);
  }, [styles]);

  const changeStyleSelected = (style) => {
    console.log(`The selected style is: ${style}`);
    setSelectedStyle(style);
  };

  if (Object.keys(product).length) {
    return (
      <div data-testid="overview">
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
          style={selectedStyle}
        />
      </div>
    );
  }
}

export default Overview;
