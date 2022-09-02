import React, { useState, useEffect } from 'react';
// import {
//   list_product,
//   product_information,
//   product_styles,
//   related_products,
//   product_reviews,
// } from '../../../example_data/example.js';
import ProductInfo from './ProductInfo.jsx';
import Styles from './Styles.jsx';
import AddToCart from './AddToCart.jsx';
import Gallery from './Gallery.jsx';
import axios from 'axios';
import

function Overview(props) {
  const [product, setProduct] = useState({});
  // const [styles, setStyles] = useState({});

  // const [product, setProduct] = useState({
  //   campus: "",
  //   category: "",
  //   created_at: "",
  //   default_price: "",
  //   description: "",
  //   features: [],
  //   id: 1,
  //   name: "",
  //   slogan: "",
  //   updated_at: ""
  // });

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

  useEffect(() => {
    axios.get(`/products/${props.product_id}`)
      .then((data) => {
        // console.log(data.data);
        setProduct(data.data);
      });
  }, []);

  useEffect(() => {
    axios.get(`/products/${props.product_id}/styles`)
      .then((data) => {
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

  useEffect(() = > {
    axios.get(`/reviews`)
  }, [])

  if (Object.keys(product).length) {
    return (
      <div>
        <ProductInfo product={product} features={product.features} />
        <Styles product={product} styles={styles.results} />
      </div>
    );
  }
}

export default Overview;
