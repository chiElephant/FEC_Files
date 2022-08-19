import React, { useState, onEffect } from 'react';
import Review from './Review.jsx';

function ReviewsList ( {reviews, setSort} ) {

  const [sortType, setSortType] = useState('relevant');

  const handleSortType = (setSortType) => {
    const sort = document.getElementById('sort-type').value;
    setSortType(sort);
    setSort(sort);
  }

  return (
    <div>
      <h3>Reviews List</h3>
      <div>
        <label>Sort on: </label>
        <select id="sort-type" onChange={() => handleSortType(setSortType)}>
          <option value="relevant">Relevant</option>
          <option value="newest">Newest</option>
          <option value="helpful">Helpful</option>
        </select>
      </div>
      <ul>
      {reviews.map(review =>
        <Review
        key={review.review_id}
        review={review}/>
      )}
      </ul>
    </div>
  )
}

export default ReviewsList;