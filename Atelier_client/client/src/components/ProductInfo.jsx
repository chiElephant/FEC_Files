import React, { useState, useEffect } from 'react';
import { list_product, product_information, product_styles, related_products, product_reviews } from '../../example_data/example.js';


function ProductInfo () {

  return (
    <div>
      <div className='product_info_reviews'>
        <div>This product has 4 stars reviews</div>
        <button>Read all reviews</button>
      </div>
      <div>{list_product[0].category}</div>
      <div>{list_product[0].name}</div>
      <div>{list_product[0].default_price}</div>
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
      <button>Add to My Outfit</button>

    </div>
  )
}

export default ProductInfo;