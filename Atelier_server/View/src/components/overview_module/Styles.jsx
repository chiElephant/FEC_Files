import React from 'react';
import AddToCart from './AddToCart.jsx';

function Styles({ styles, handleStyleChange, currentStyle }) {
  const handleSelect = (e) => {
    e.preventDefault();
    handleStyleChange(JSON.parse(e.target.getAttribute('data')));
  };

  if (styles.length) {
    return (
      <>
        <div className="gallery-styles-container">
          {styles.map((style) => (
            <button
              className="image-btn"
              onClick={(e) => {
                handleSelect(e);
              }}
              key={`${style.id}/${style.name}`}
              data={JSON.stringify(style)}
            >
              <img
                className={
                  style.name === currentStyle.name
                    ? 'selected-style-thumbnail'
                    : 'style_thumbnail'
                }
                data={JSON.stringify(style)}
                src={
                  style.photos.length > 0 ? style.photos[0].thumbnail_url : null
                }
                alt={style.name}
              />
            </button>
          ))}
        </div>
        <AddToCart currentStyle={currentStyle} />
      </>
    );
  }
}

export default Styles;
