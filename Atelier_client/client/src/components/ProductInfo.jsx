import React, { useState, useEffect } from 'react';
import { list_product, product_information, product_styles, related_products } from '../../example_data/example.js';


function ProductInfo () {

  return (
    <div>
      <h4>{list_product[0].slogan}</h4>
      <div>{list_product[0].description}</div>
      <ul>
        {
          product_information.features.map((feature) => {
            return (
              <li>{feature.value + ' ' + feature.feature}</li>
            )
          })
        }
      </ul>

    </div>
  )
}

export default ProductInfo;