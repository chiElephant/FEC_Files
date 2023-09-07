import React from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImage from './global-helpers/defaultImage';
import renderRatings from './global-helpers/renderRatings';

function Product({
  id,
  name,
  category,
  defaultPrice,
  photo,
  ratingAverage,
  resetProductData,
}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${id}`);
    resetProductData();
  };

  return (
    <div
      key={id}
      className="product-card"
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyPress={handleNavigate}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <img
        src={photo === null ? defaultImage : photo}
        alt={name}
        className="product-image"
      />
      <div className="product-card-text-content">
        <div>{category}</div>
        <div>{name}</div>
        <div>{`$${defaultPrice}`}</div>
        <div className="rating">{renderRatings(ratingAverage)}</div>
      </div>
    </div>
  );
}

export default Product;
