import React, { useState, useEffect } from 'react';
import { initialReviewState, getReviews } from './helper_functions/reviews_module';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import SubmitReview from './SubmitReview.jsx';
import ReviewsList from './ReviewsList.jsx';

function ReviewsModule({ product_id, product_name }) {
  const [reviewsShown, setReviewsShown] = useState(initialReviewState);
  const [characteristics, setCharacteristics] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [productName, setProductName] = useState(product_name);
  const [productId, setProductId] = useState(product_id);
  const [sortType, setSortType] = useState('relevance');
  const [countShown, setCountShown] = useState(2);
  const [reviews, setReviews] = useState(initialReviewState);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const MAX_COUNT = 500;

    getReviews(productId, sortType, MAX_COUNT, setReviews, setReviewCount);
  }, [productId, countShown, sortType]);

  useEffect(() => {
    const show = reviews.slice(0, countShown);
    setReviewsShown(preReviewsShown => show);
  }, [reviews, countShown]);

  function handleCountShown () {
    if (countShown >= reviewCount) {
      const element = document.getElementById("more-reviews");
      element.remove();
    }
    setCountShown(countShown => countShown + 2);
  }

  return (
    <div id="reviews-module">
      <h2 id="ratings-reviews"> Ratings and Reviews </h2>
      <RatingsBreakdown productId={productId}
        setCharacteristics={setCharacteristics}
        characteristics={characteristics}
      />
      <ReviewsList
        reviews={reviewsShown}
        setSortType={setSortType}
        reviewCount={reviewCount}
      />
      <SubmitReview
        showReviewModal={showReviewModal}
        setShowReviewModal={setShowReviewModal}
        productName={productName}
        product_id={productId}
        characteristics={characteristics}
      />
      <div id="main-buttons">
        <button className='reviews-btn'
          onClick={() =>
            setShowReviewModal((showReviewModal) => !showReviewModal)
          }
        >
          ADD A REVIEW +
        </button>
        <button
          id="more-reviews"
          className='reviews-btn'
          onClick={() => handleCountShown()}
        >
          MORE REVIEWS
        </button>
      </div>
    </div>
  );
}

export default ReviewsModule;
