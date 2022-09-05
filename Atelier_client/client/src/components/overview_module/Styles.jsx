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

function Styles(props) {
  const [selectedStyle, setSelectedStyle] = useState({});

  useEffect(() => {
    setSelectedStyle(props.style);
  }, []);

  useEffect(() => {
    setSelectedStyle(props.style);
    props.changeStyleSelected(props.style);
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
          {props.styles.map((style, index) => {
            if (style.name === selectedStyle.name) {
              console.log('This is the style selected: ', style.name);
              return (
                <img
                  className="selected-style-thumbnail"
                  onClick={(e) => {
                    handleSelect(e);
                  }}
                  value={JSON.stringify(style)}
                  src={style.photos[0].thumbnail_url}
                  key={index}
                />
              );
            }
            return (
              <img
                className="style_thumbnail"
                onClick={(e) => {
                  handleSelect(e);
                }}
                value={JSON.stringify(style)}
                src={style.photos[0].thumbnail_url}
                key={index}
              />
            );
          })}
        </div>
        <AddToCart style={selectedStyle} />
        <Gallery style={selectedStyle} />
      </div>
    );
  }
}

export default Styles;
