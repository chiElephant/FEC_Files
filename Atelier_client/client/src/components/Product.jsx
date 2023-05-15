import React from 'react';
import { Link } from 'react-router-dom';

function Product({
  id,
  campus,
  name,
  slogan,
  description,
  category,
  created_at,
  updated_at,
  defaultPrice,
  photo,
  ratingAverage,
  reviewsCount,
  features,
  styles,
}) {
  const defaultImage =
    'https://res.cloudinary.com/red-bean-rulez/image/upload/v1682800370/FEC_project/i2e4rxjyvxnzhl43vwa3.webp';

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

  const handleLinkClick = () => {
    const newUrl = `/${id}`;
    window.location.href = newUrl;
  };

  return (
    <Link
      to={`/${id}`}
      state={{
        id,
        campus,
        name,
        slogan,
        description,
        category,
        created_at,
        updated_at,
        defaultPrice,
        photo,
        ratingAverage,
        reviewsCount,
        features,
        styles,
      }}
      style={{ textDecoration: 'none', color: 'inherit' }}
      onClick={handleLinkClick}
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
