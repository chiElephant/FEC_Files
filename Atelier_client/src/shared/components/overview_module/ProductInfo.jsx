import React, { useState, useEffect } from 'react';
import renderRatings from '../global-helpers/renderRatings';

function ProductInfo({
  name,
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

  return (
    <div className="product-info-container">
      <div className="rating">{renderRatings(ratingAverage)}</div>
      <div className="scroll-review" to="reviews-module">
        Read all ({reviewsCount}) reviews
      </div>
      <div>{category}</div>
      <h2>{name}</h2>
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
