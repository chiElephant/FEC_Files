import React, { useState, useEffect } from 'react';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import ReviewsList from './ReviewsList.jsx';
import AddReview from './AddReview.jsx';
import { revs } from './seed_data.js'
import axios from 'axios';

function ReviewsModule ( { product_id } ) {

  const [reviews, setReviews] = useState(revs);
  const [countShown, setCountShown] = useState(2);
  const [revsShown, setRevsShown] = useState(reviews.slice(0, countShown));
  const [addReview, setAddReview] = useState(false);
  const [sortType, setSortType] = useState('');


  function closeReview() {
    setAddReview(false)
  }

  function setSort (type) {
    setSortType(type);
  }

  function handleClick (cb, value) {
    cb(value);
  }

  return (
    <div>
      <h3> Ratings Module </h3>
      <RatingsBreakdown
        product_id={product_id} />
      <ReviewsList
        reviews={revs}
        setSort={setSort}/>
      <AddReview
        addReview={addReview}
        closeReview={closeReview}/>
      <button onClick={() => handleClick(setCountShown, countShown + 2)} disabled={countShown >= reviews.length}>More Reviews</button>
      <button onClick={() => handleClick(setAddReview, !addReview)}>Add Review</button>
    </div>
  )
}

export default ReviewsModule;
