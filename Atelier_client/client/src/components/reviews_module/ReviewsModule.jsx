import React, { useState, useEffect } from 'react';
import {
  initialReviewState,
  initialFilters,
  filterReviews,
  getReviews,
} from './helper_functions/reviews_module';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import SubmitReview from './SubmitReview.jsx';
import ReviewsList from './ReviewsList.jsx';

function ReviewsModule({ product_id, product_name }) {
  const [reviewsShown, setReviewsShown] = useState(initialReviewState);
  const [currentFilters, setCurrentFilters] = useState(initialFilters);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [reviews, setReviews] = useState(initialReviewState);
  const [characteristics, setCharacteristics] = useState({});
  const [sortType, setSortType] = useState('relevance');
  const [reviewCount, setReviewCount] = useState(0);
  const [countShown, setCountShown] = useState(2);

  useEffect(() => {
    const MAX_COUNT = 300;

    getReviews(product_id, sortType, MAX_COUNT, setReviews, setReviewCount);
  }, [product_id, sortType]);

  useEffect(() => {
    filterReviews(reviews, currentFilters, setReviewsShown, countShown);
  }, [reviews, countShown, currentFilters]);

  function handleCountShown() {
    if (countShown >= reviewCount) {
      const element = document.getElementById('more-reviews');
      element.remove();
    }

    setCountShown((countShown) => countShown + 2);

    const div = document.getElementById('reviews');
    div.scorllTop = div.scrollHeight;
  }

  return (
    <div id="reviews-module">
      <h2 id="ratings-reviews"> Ratings and Reviews </h2>
      <RatingsBreakdown
        productId={product_id}
        setCharacteristics={setCharacteristics}
        characteristics={characteristics}
        setCurrentFilters={setCurrentFilters}
        currentFilters={currentFilters}
      />
      {reviewsShown.length === 0 ? (
        ''
      ) : (
        <ReviewsList
          reviews={reviewsShown}
          setSortType={setSortType}
          reviewCount={reviewCount}
        />
      )}
      <SubmitReview
        showReviewModal={showReviewModal}
        setShowReviewModal={setShowReviewModal}
        productName={product_name}
        product_id={product_id}
        characteristics={characteristics}
      />
      <div id="main-buttons">
        <button
          className="reviews-btn"
          onClick={() =>
            setShowReviewModal((showReviewModal) => !showReviewModal)
          }
        >
          ADD A REVIEW +
        </button>
        <button
          id="more-reviews"
          className="reviews-btn"
          onClick={() => handleCountShown()}
        >
          MORE REVIEWS
        </button>
      </div>
    </div>
  );
}

export default ReviewsModule;
