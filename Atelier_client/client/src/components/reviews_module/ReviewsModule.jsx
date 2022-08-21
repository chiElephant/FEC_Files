import React, { useState, useEffect } from 'react';
import { helpers, initial } from './helper_functions/reviews_module.jsx';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import SubmitReview from './SubmitReview.jsx';
import ReviewsList from './ReviewsList.jsx';

function ReviewsModule({ productId, productName }) {
  const [reviewsShown, setReviewsShown] = useState(initial.reviewModel);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [product_name, setProductName] = useState(productName);
  const [product_id, setProductId] = useState(productId);
  const [sortType, setSortType] = useState('relevance');
  const [countShown, setCountShown] = useState(2);
  const [reviews, setReviews] = useState(initial.reviewModel);

  useEffect(() => {
    helpers.getReviews(product_id, sortType, setReviews);
  }, [product_id, countShown, sortType]);

  useEffect(() => {
    helpers.handleShown(reviews, countShown, setReviewsShown);
  }, [reviews, countShown]);

  return (
    <div>
      <h2> Ratings Module </h2>
      <RatingsBreakdown product_id={product_id} />
      <ReviewsList
        reviews={reviewsShown}
        setSort={helpers.setSort}
        setType={setSortType}
        set
      />
      <SubmitReview
        showReviewModal={showReviewModal}
        submitReview={helpers.submitReview}
        setShowReviewModal={setShowReviewModal}
      />
      <button
        onClick={() => helpers.handleClick(setCountShown, countShown + 2)}
        disabled={countShown >= reviews.length}
      >
        More Reviews
      </button>
      <button
        onClick={() =>
          helpers.handleClick(setShowReviewModal, !showReviewModal)
        }
      >
        Add Review
      </button>
    </div>
  );
}

export default ReviewsModule;
