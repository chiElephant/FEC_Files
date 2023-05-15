import React from 'react';

function Slogan({ product, slogan }) {
  if (Object.keys(product).length) {
    return (
      <div className="slogan-features">
        <div className="slogan">{slogan}</div>
        <ul className="features">
          {product.features.map((feature, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>{`${feature.value} ${feature.feature}`}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Slogan;
