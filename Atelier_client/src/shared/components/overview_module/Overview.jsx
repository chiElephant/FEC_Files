import React, { useState, useEffect } from 'react';
import ProductInfo from './ProductInfo.jsx';
import Styles from './Styles.jsx';
import Gallery from './Gallery.jsx';
import Slogan from './Slogan.jsx';

export default function Overview({ productData }) {
  const [selectedStyle, setSelectedStyle] = useState(productData.styles[0]);

  const changeStyleSelected = (style) => {
    setSelectedStyle(style);
  };

  return (
    <div className="main-container">
      <div data-testid="overview" className="overview">
        <Gallery selectedStyle={selectedStyle} />
        <div className="new-right">
          <ProductInfo {...productData} selectedStyle={selectedStyle} />
          <Styles
            styles={productData.styles}
            changeStyleSelected={changeStyleSelected}
            selectedStyle={selectedStyle}
          />
        </div>
      </div>
      <Slogan {...productData} />
    </div>
  );
}
