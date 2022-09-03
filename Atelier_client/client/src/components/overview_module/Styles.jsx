/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
// import {
//   list_product,
//   product_information,
//   product_styles,
//   related_products,
//   product_reviews,
// } from '../../example_data/example.js';
import AddToCart from './AddToCart.jsx';
import Gallery from './Gallery.jsx';
// console.log('These are the props for styles component: ', props.styles);
function Styles(props) {
  console.log('These are the props for styles component: ', props.styles);
  const [selectedStyle, setSelectedStyle] = useState({});

  useEffect(() => {
    setSelectedStyle(props.styles[0]);
  }, []);

  useEffect(() => {
    setSelectedStyle(props.styles[0]);
    props.changeStyleSelected(props.styles[0]);
  }, [props.styles]);

  const handleSelect = (e) => {
    e.preventDefault();
    // console.log(JSON.parse(e.target.getAttribute('value')));
    setSelectedStyle(JSON.parse(e.target.getAttribute('value')));
    props.changeStyleSelected(JSON.parse(e.target.getAttribute('value')));
  };

  if (props.styles.length) {
    // console.log(`There are ${props.styles.length} styles`);
    return (
      <div>
        <div
          data-testid="style-selector"
          className="product_overview_style_selector"
        >
          {props.styles.map((style, index) => (
            <img
              className="style_thumbnail"
              onClick={(e) => {
                handleSelect(e);
              }}
              value={JSON.stringify(style)}
              src={style.photos[0].thumbnail_url}
              key={index}
            />
          ))}
        </div>
        <AddToCart style={selectedStyle} />
        <Gallery style={selectedStyle} />
      </div>
    );
  }
}

export default Styles;
