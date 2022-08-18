import React, { useState, useEffect } from 'react';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import ReviewsList from './ReviewsList.jsx';
import SubmitReview from './SubmitReview.jsx';

function ReviewsModule ( { product_id } ) {

  const [reviews, setReviews] = useState([]);
  const [countShown, setCountShown] = useState(2);
  const [reviewsToShow, setreviewsToShow] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [sortType, setSortType] = useState('relevance');

  const closeReview = () => {
    showReviewModal(false);
  }

  const setSort = (type) => {
    setSortType(type);
  }

  const handleClick = (cb, value) => {
    cb(value);
  }

  return (
    <div>
      <h3> Ratings Module </h3>
      <RatingsBreakdown
        product_id={product_id} />
      <ReviewsList
        reviews={reviews}
        setSort={setSort}/>
      <SubmitReview
        showReviewModal={showReviewModal}
        closeReview={closeReview}/>
      <button onClick={() => handleClick(setCountShown, countShown + 2)} disabled={countShown >= reviews.length}>More Reviews</button>
      <button onClick={() => handleClick(setshowReviewModal, !showReviewModal)}>Add Review</button>
    </div>
  )
}

export default ReviewsModule;
