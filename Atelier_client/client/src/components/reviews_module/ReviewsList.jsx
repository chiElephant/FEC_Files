import React, { useState, onEffect } from 'react';
import handleSortType  from './helper_functions/review_list.jsx';
import Review from './Review.jsx';

function ReviewsList({ reviews, setSort, setType }) {
  const [sortType, setSortType] = useState('relevance');

  return (
    <div id="reviews-list">
      <h3>Reviews List</h3>
      <div>
        <label>Sort on: </label>
        <select
          id="sort-type"
          onChange={() => handleSortType(setSort, setType)}
        >
          <option value="relevant">Relevant</option>
          <option value="newest">Newest</option>
          <option value="helpful">Helpful</option>
        </select>
      </div>
      <ul id='reviews'>
        {reviews.map((review) => (
          <Review key={review.review_id} review={review} />
        ))}
      </ul>
    </div>
  );
}

export default ReviewsList;
