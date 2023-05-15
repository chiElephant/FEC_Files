import React from 'react';
import AddToCart from './AddToCart.jsx';

function Styles({ styles, selectedStyle, changeStyleSelected }) {
  const handleSelect = (e) => {
    e.preventDefault();
    changeStyleSelected(JSON.parse(e.target.getAttribute('value')));
  };

  if (styles.length) {
    return (
      <div className="gallery-styles-container">
        <div className="right">
          <div
            data-testid="style-selector"
            className="product_overview_style_selector"
          >
            {styles.map((style, index) => {
              if (style.name === selectedStyle.name) {
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
          {selectedStyle ? <AddToCart {...selectedStyle} /> : null}
        </div>
      </div>
    );
  }
}

export default Styles;
