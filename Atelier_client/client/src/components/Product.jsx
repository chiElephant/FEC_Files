/* global window */

import React from 'react';
import { Link } from 'react-router-dom';
import defaultImage from './global-helpers/defaultImage';

function Product({ id, name, category, defaultPrice, photo, ratingAverage }) {
  const renderRating = () => {
    const fullStars = Math.floor(ratingAverage);
    const hasHalfStar = ratingAverage % 1 !== 0;
    const emptyStars = Math.floor(5 - ratingAverage);

    const starElements = [];

    for (let i = 0; i < fullStars; i++) {
      starElements.push(<i className="fa fa-star" key={i} />);
    }

    if (hasHalfStar) {
      starElements.push(<i className="fa fa-star-half-o" key={fullStars} />);
    }

    for (let i = 0; i < emptyStars; i++) {
      starElements.push(
        <i
          className="fa fa-star-o"
          key={fullStars + (hasHalfStar ? 1 : 0) + i}
        />
      );
    }

    return starElements;
  };

  return (
    <Link
      key={id}
      to={`/${id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
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
    </Link>
  );
}

export default Product;
