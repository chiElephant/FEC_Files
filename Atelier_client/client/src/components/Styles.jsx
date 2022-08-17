import React, { useState, useEffect } from 'react';
import { list_product, product_information, product_styles, related_products, product_reviews } from '../../example_data/example.js';

function Styles () {



  return (
    <div className='product_overview_style_selector'>
      {
        product_styles.results.map((style) => {
          return (
            <div>
              <div>This is the style number {style.style_id} </div>
              <img src='https://i1.adis.ws/i/boohooamplience/mzz12456_grey_xl_3?$product_image_main_mobile$&fmt=webp'></img>
            </div>
          )
        })
      }
    </div>
  )
}

export default Styles;