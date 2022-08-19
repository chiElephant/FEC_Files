import React, { useState, useEffect } from 'react';
import { list_product, product_information, product_styles, related_products, product_reviews } from '../../example_data/example.js';
import AddToCart from './AddToCart.jsx';

function Styles (props) {

  console.log('These are the props for styles component: ', props.styles);
  const [selectedStyle, setSelectedStyle] = useState({});

  useEffect(() => {
    setSelectedStyle(props.styles[0])
  }, []);

  useEffect(() => {
    setSelectedStyle(props.styles[0])
  }, [props.styles]);

  if (Object.keys(selectedStyle).length) {
    console.log('This is the selectedStyle length: ', Object.keys(selectedStyle).length);
    return (
      <div className='product_overview_style_selector'>

        {
          selectedStyle.photos.map((photo) => {
            return (
              <div>
                <img className='style_thumbnail' src={photo.thumbnail_url}></img>
              </div>
            )
          })
        }
        <AddToCart style={selectedStyle}/>
      </div>
    )
  }
}

export default Styles;