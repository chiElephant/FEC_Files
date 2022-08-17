import React, { useState, useEffect } from 'react';
import { list_product, product_information, product_styles, related_products, product_reviews } from '../../example_data/example.js';
import ProductInfo from './ProductInfo.jsx';


function Overview () {

  return (
    <div>
      <ProductInfo />
    </div>
  )
}

export default Overview;