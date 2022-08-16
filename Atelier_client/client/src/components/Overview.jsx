import React, { useState, useEffect } from 'react';
import { list_product, product_information, product_styles, related_products } from '../../example_data/example.js';
import ProductInfo from './ProductInfo.jsx';


function Overview () {

  return (
    <div>
      <div>This is the Overview component</div>
      <ProductInfo />
      <div>{list_product[0].id}</div>
    </div>
  )
}

export default Overview;