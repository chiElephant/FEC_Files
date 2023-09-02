import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

function ProductInfo({
  name,
  slogan,
  category,
  ratingAverage,
  reviewsCount,
  selectedStyle,
}) {
  const [price, setPrice] = useState({ amount: null, discounted: false });

  useEffect(() => {
    if (selectedStyle.sale_price !== null) {
      setPrice({ amount: selectedStyle.sale_price, discounted: true });
    } else {
      setPrice({ amount: selectedStyle.original_price, discounted: false });
    }
  }, [selectedStyle]);

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
    <div className="product-info-container">
      <div className="product_info_reviews">
        <fieldset>{renderRating()}</fieldset>
        <Link
          className="scroll-review"
          to="reviews-module"
          smooth
          duration={500}
        >
          Read all ({reviewsCount}) reviews
        </Link>
      </div>
      <div>{category}</div>
      <h2>{name}</h2>
      <h4>{slogan}</h4>
      <div>{selectedStyle.name}</div>
      <div>
        {price.discounted ? (
          <div className="price-container">
            <div className="discounted-price">${price.amount}</div>
            <div className="original-price">
              ${selectedStyle.original_price}
            </div>
          </div>
        ) : (
          <div className="original-price">${selectedStyle.original_price}</div>
        )}
      </div>

      <button className="addto-outfit">Add to My Outfit</button>
    </div>
  );
}

export default ProductInfo;
