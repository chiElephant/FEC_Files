import React, { useState, useEffect } from 'react';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import ReviewsList from './ReviewsList.jsx';
import SubmitReview from './SubmitReview.jsx';
import axios from 'axios';

function ReviewsModule ( props ) {

  const [reviews, setReviews] = useState([]);
  const [countShown, setCountShown] = useState(2);
  const [reviewsShown, setReviewsShown] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [sortType, setSortType] = useState('relevance');
  const [product_id, setProductId] = useState(71697);
  const [productName, setProductName] = useState('');

  useEffect(() => {
    getReviews()
  }, [product_id, countShown, sortType])

  useEffect(() => {
    handleShown()
  }, [reviews, countShown])

  const getReviews = () => {
    const options = {
      params: { product_id, sort: sortType }
    }
    axios.get('/reviews', options)
    .then(response => {
      setReviews(response.data)
    })
    .catch(error => {
      console.log(error);
    })
  }

  const handleShown = () => {
    const show = reviews.slice(0, countShown);

    setReviewsShown(show)
  }

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
      <h2> Ratings Module </h2>
      <RatingsBreakdown
        product_id={product_id} />
      <ReviewsList
        reviews={reviewsShown}
        setSort={setSort}/>
      <SubmitReview
        showReviewModal={showReviewModal}
        closeReview={closeReview}/>
      <button onClick={() => handleClick(setCountShown, countShown + 2)} disabled={countShown >= reviews.length}>More Reviews</button>
      <button onClick={() => handleClick(setShowReviewModal, !showReviewModal)}>Add Review</button>
    </div>
  )
}

export default ReviewsModule;
