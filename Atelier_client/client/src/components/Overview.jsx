import React, { useState, useEffect } from 'react';
import { list_product, product_information, product_styles, related_products, product_reviews } from '../../example_data/example.js';
import ProductInfo from './ProductInfo.jsx';
import Styles from './Styles.jsx';
import axios from 'axios';


function Overview (props) {

  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState({});

  useEffect(() => {
    axios.get(`/products/${props.product_id}`)
      .then((data) => {
        console.log(data.data);
        setProduct(data.data);
      });
  }, []);

  useEffect(() => {
    axios.get(`/products/${props.product_id}/styles`)
      .then((data) => {
        console.log(data.data);
        setStyles(data.data);
      });
  }, []);

  if (Object.keys(product).length) {
    return (
      <div>
        <ProductInfo product={product} features={product.features}/>
        <Styles product={product} styles={styles.results}/>
      </div>
    )

  }
}

export default Overview;