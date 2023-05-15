import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductInfo from './ProductInfo.jsx';
import Styles from './Styles.jsx';
import Gallery from './Gallery.jsx';
import Slogan from './Slogan.jsx';

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

function Overview({ product_id, product, avgRating, totalReviews }) {
  const [selectedStyle, setSelectedStyle] = useState(styleInterface);
  const [styles, setStyles] = useState([styleInterface]);
  // const selectedSty = useRef(styleInterface);

  useEffect(() => {
    if (product_id) {
      axios
        .get(`/products/${product_id}/styles`)
        .then((response) => {
          setStyles(response.data);
          return response.data;
        })
        .then((data) => {
          data.filter((style) => {
            const { default_style } = style;
            if (default_style) {
              setSelectedStyle(style);
              // selectedSty.current = style;
              return style;
            }
          });
        })
        .catch((error) => console.log('Error fetching styles', error));
    }
  }, [product_id]);

  // const changeStyleSelected = (newStyle) => {
  //   setSelectedStyle(newStyle);
  //   selectedSty.current(newStyle);
  // };

  const content =
    product_id === null ? (
      ''
    ) : (
      <div id="main-container" className="main-container">
        <div data-testid="overview" className="overview">
          <Gallery styles={styles} />
          {/* <Gallery style={selectedStyle} current={selectedSty} /> */}
          <div className="new-right">
            {/* <ProductInfo
              product={product}
              style={selectedStyle}
              avgRating={avgRating}
              totalReviews={totalReviews}
            />
            <Styles
              styles={styles}
              changeStyleSelected={changeStyleSelected}
              style={selectedStyle}
              current={selectedSty}
            /> */}
          </div>
        </div>
        {/* <Slogan product={product} /> */}
      </div>
    );

  return content;
}

export default Overview;
