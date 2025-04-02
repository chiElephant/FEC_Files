import React from 'react';
import defaultImage from '../global-helpers/defaultImage';
import AddToCart from './AddToCart.jsx';

export default function Styles({ styles, selectedStyle, changeStyleSelected }) {
  const handleSelect = (style) => {
    changeStyleSelected(style);
  };

  if (styles.length === 0) {
    return null;
  }

  return (
    <div
      data-testid="style-selector"
      className="product_overview_style_selector"
    >
      {styles.map((style) => {
        const isSelected = style.style_id === selectedStyle.style_id;
        const photo = style.photos[0].thumbnail_url || defaultImage;

        return (
          <button
            key={style.style_id}
            className="style_button"
            onClick={() => handleSelect(style)}
            onKeyPress={() => handleSelect(style)}
          >
            <img
              className={`style_thumbnail ${isSelected ? 'selected' : ''}`}
              aria-label={isSelected ? 'Selected style' : 'Unselected style'}
              src={photo}
            />
          </button>
        );
      })}
    </div>
    // {/* {selectedStyle && <AddToCart {...selectedStyle} />} */}
  );
}
