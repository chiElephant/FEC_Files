import React, { useState, useEffect } from 'react';
import { list_product, product_information, product_styles, related_products, product_reviews } from '../../example_data/example.js';


function ProductInfo (props) {

  console.log('These are the product features: ', props.product)

  if (Object.keys(props.product).length) {
    return (
      <div>
        <div className='product_info_reviews'>
          <div>This product has 4 stars reviews</div>
          <button>Read all reviews</button>
        </div>
        <div>{props.product.category}</div>
        <div>{props.product.name}</div>
        <div>{props.product.default_price}</div>
        <h4>{props.product.slogan}</h4>
        <div>{props.product.description}</div>
        <ul>
          {
            props.product.features.map((feature) => {
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
}

export default ProductInfo;