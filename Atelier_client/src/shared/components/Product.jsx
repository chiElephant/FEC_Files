import React, { cloneElement } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star,
  StarHalfOutlined,
  StarBorderOutlined,
} from '@mui/icons-material';
import defaultImage from './global-helpers/defaultImage';

const fullStarIcon = <Star />;
const halfStarIcon = <StarHalfOutlined />;
const emptyStarIcon = <StarBorderOutlined />;

function Product({
  id,
  name,
  category,
  defaultPrice,
  photo,
  ratingAverage,
  resetProductData,
}) {
  const renderRating = () => {
    if (ratingAverage === null) {
      return Array(5)
        .fill(null)
        .map((_, i) => cloneElement(emptyStarIcon, { key: `empty-${i}` }));
    }

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
      starElements.push(cloneElement(emptyStarIcon, { key: `empty-${i}` }));
    }

    return starElements;
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    console.log(`/${id}`);
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
        <div className="rating">{renderRating()}</div>
      </div>
    </div>
  );
}

export default Product;
