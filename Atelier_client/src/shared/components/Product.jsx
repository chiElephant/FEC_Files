/* global window */

import React, { cloneElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
// import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

import defaultImage from './global-helpers/defaultImage';

const fullStarIcon = <FontAwesomeIcon icon="fa fa-star" />;
const halfStarIcon = <FontAwesomeIcon icon="fa fa-star-half-alt" />;
const emptyStarIcon = <FontAwesomeIcon icon="far fa-star" />;

function Product({ id, name, category, defaultPrice, photo, ratingAverage }) {
  const renderRating = () => {
    const fullStars = Math.floor(ratingAverage);
    const hasHalfStar = ratingAverage % 1 !== 0;
    const emptyStars = Math.floor(5 - ratingAverage);

    const starElements = [];

    for (let i = 0; i < fullStars; i++) {
      starElements.push(cloneElement(fullStarIcon, { key: `full-${i}` }));
    }

    if (hasHalfStar) {
      starElements.push(cloneElement(halfStarIcon, { key: 'half' }));
    }

    for (let i = 0; i < emptyStars; i++) {
      starElements.push(
        React.cloneElement(emptyStarIcon, { key: `empty-${i}` })
      );
    }

    return starElements;
  };

  return (
    <div className="product-card">
      <img
        src={photo === null ? defaultImage : photo}
        alt={name}
        className="product-image"
      />
      <div className="product-card-text-content">
        <div>{category}</div>
        <div>{name}</div>
        <div>{`$${defaultPrice}`}</div>
        <div className="rating">{renderRating()}</div>
      </div>
    </div>
  );
}

export default Product;
