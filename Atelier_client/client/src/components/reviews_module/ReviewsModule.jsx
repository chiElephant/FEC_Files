import React, { useState, useEffect } from 'react';
import { helpers, initial } from './helper_functions/reviews_module.jsx';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import SubmitReview from './SubmitReview.jsx';
import ReviewsList from './ReviewsList.jsx';

function ReviewsModule({ product_id, product_name }) {
  const [reviewsShown, setReviewsShown] = useState(initial.reviewModel);
  const [characteristics, setCharacteristics] = useState({})
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [productName, setProductName] = useState(product_name);
  const [productId, setProductId] = useState(product_id);
  const [sortType, setSortType] = useState('relevance');
  const [countShown, setCountShown] = useState(2);
  const [reviews, setReviews] = useState(initial.reviewModel);

  useEffect(() => {
    const count = 100;

    helpers.getReviews(productId, sortType, count, setReviews);
  }, [productId, countShown, sortType]);

  useEffect(() => {
    helpers.handleShown(reviews, countShown, setReviewsShown);
  }, [reviews, countShown]);

  return (
    <div id="reviews-module">
      <h2> Ratings and Reviews </h2>
      <RatingsBreakdown productId={productId}
        setCharacteristics={setCharacteristics}
        characteristics={characteristics} />
      <ReviewsList
        reviews={reviewsShown}
        setSort={helpers.setSort}
        setType={setSortType}
      />
      <SubmitReview
        showReviewModal={showReviewModal}
        setShowReviewModal={setShowReviewModal}
        productName={productName}
        product_id={productId}
        chars={characteristics}
      />
      <div id="main-buttons">
        <button
          onClick={() =>
            helpers.handleClick(setShowReviewModal, !showReviewModal)
          }
        >
          Add Review
        </button>
        <button
          onClick={() => helpers.handleClick(setCountShown, countShown + 2)}
          disabled={countShown >= reviews.length}
        >
          More Reviews
        </button>
      </div>
    </div>
  );
}

export default ReviewsModule;
