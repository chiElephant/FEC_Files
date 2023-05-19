import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-scroll';

function ProductInfo({ product, style, metadata }) {
  const { avgRating, totalReviews } = metadata;

  let priceElement;

  if (style.sale_price !== 'null') {
    priceElement = (
      <div className="price-container">
        <div className="discounted-price">${style.sale_price}</div>
        <div className="original-price">${style.original_price}</div>
      </div>
    );
  } else {
    priceElement = (
      <div className="original-price">${style.original_price}</div>
    );
  }

  return product.id !== 0 ? (
    <div className="product-info-container">
      <div className="product_info_reviews">
        <fieldset>
          {[1, 2, 3, 4, 5].map((index) => (
            <FontAwesomeIcon
              id={`star-${index}`}
              icon={avgRating >= index ? solidStar : regularStar}
              key={index}
            />
          ))}
        </fieldset>
        <Link
          className="scroll-review"
          to="reviews-module"
          smooth
          duration={500}
        >
          Read all ({totalReviews}) reviews
        </Link>
      </div>
      <div>{product.category}</div>
      <h2>{product.name}</h2>
      <h3>{product.slogan}</h3>
      <div>{style.name}</div>
      <div>{priceElement}</div>
      <button className="addto-outfit">Add to My Outfit</button>
    </div>
  ) : null;
}

export default ProductInfo;
