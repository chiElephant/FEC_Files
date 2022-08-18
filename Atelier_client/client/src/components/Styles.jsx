import React, { useState, useEffect } from 'react';
import { list_product, product_information, product_styles, related_products, product_reviews } from '../../example_data/example.js';

function Styles (props) {

  console.log('These are the props for styles component: ', props.styles);
  const [selectedStyle, setSelectedStyle] = useState(props.styles[0]);

  return (
    <div className='product_overview_style_selector'>
      <div></div>
      {
        selectedStyle.photos.map((photo) => {
          return (
            <div>
              <img className='style_thumbnail' src={photo.thumbnail_url}></img>
            </div>
          )
        })
      }
    </div>
  )
}

export default Styles;