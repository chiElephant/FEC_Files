import React, { useState, useEffect } from 'react';
import { helpers, initial } from './helper_functions/reviews_module.jsx'
import RatingsBreakdown from './RatingsBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import SubmitReview from './SubmitReview.jsx';
import ReviewsList from './ReviewsList.jsx';
import axios from 'axios';

function ReviewsModule ( props ) {

  const [reviewsShown, setReviewsShown] = useState(initial.reviewsShown);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [sortType, setSortType] = useState('relevance');
  const [product_id, setProductId] = useState(71697);
  const [productName, setProductName] = useState('');
  const [countShown, setCountShown] = useState(2);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    helpers.getReviews(product_id, sortType, setReviews)
  }, [product_id, countShown, sortType])

  useEffect(() => {
    helpers.handleShown(reviews, countShown, setReviewsShown)
  }, [reviews, countShown])

  return (
    <div>
      <h2> Ratings Module </h2>
      <RatingsBreakdown
        product_id={product_id} />
      <ReviewsList
        reviews={reviewsShown}
        setSort={helpers.setSort}/>
      <SubmitReview
        showReviewModal={showReviewModal}
        closeReview={helpers.closeReview}/>
      <button onClick={() => helpers.handleClick(setCountShown, countShown + 2)} disabled={countShown >= reviews.length}>More Reviews</button>
      <button onClick={() => helpers.handleClick(setShowReviewModal, !showReviewModal)}>Add Review</button>
    </div>
  )
}

export default ReviewsModule;
