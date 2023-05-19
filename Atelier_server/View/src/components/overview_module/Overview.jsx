import React, { useState, useEffect } from 'react';
import ProductInfo from './ProductInfo.jsx';
import Styles from './Styles.jsx';
import Gallery from './Gallery.jsx';
import Slogan from './Slogan.jsx';
import { getStyles } from '../../lib/dataHandlers.js';

const styleInterface = {
  style_id: 0,
  name: '',
  original_price: '',
  sale_price: 0,
  is_default: true,
  photos: [
    {
      thumbnail_url: '',
      url: '',
    },
  ],
  skus: {},
};

function Overview({ product, metadata, altPhoto }) {
  const [currentStyle, setCurrentStyle] = useState(styleInterface);
  const [styles, setStyles] = useState([styleInterface]);

  useEffect(() => {
    async function handleStyles() {
      const stylesData = await getStyles(product.id);
      if (stylesData !== undefined) {
        setStyles(stylesData.styles);
        setCurrentStyle(stylesData.defaultStyle);
      }
    }
    if (product !== null) {
      handleStyles();
    }
  }, [product]);

  const handleStyleChange = (newStyle) => {
    setCurrentStyle(newStyle);
  };

  const content =
    product === null ? null : (
      <div id="main-container" className="main-container">
        <div data-testid="overview" className="overview">
          <Gallery currentStyle={currentStyle} altPhoto={altPhoto} />
          <div className="product-data-container">
            <ProductInfo
              product={product}
              style={currentStyle}
              metadata={metadata}
            />
            <Styles
              styles={styles}
              currentStyle={currentStyle}
              handleStyleChange={handleStyleChange}
            />
          </div>
        </div>
        <Slogan product={product} />
      </div>
    );

  return content;
}

export default Overview;
