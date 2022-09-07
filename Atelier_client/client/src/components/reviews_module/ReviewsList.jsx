import React, { useState, onEffect } from 'react';
import handleSortType  from './helper_functions/review_list.js';
import Review from './Review.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, light, thin, duotone, icon } from '@fortawesome/fontawesome-svg-core/import.macro';


function ReviewsList({ reviews, setSort, setType }) {
  const [sortType, setSortType] = useState('relevance');

  return (
    <div id="reviews-list">
      <div id="review-sort">
        <div id="sort-text">
          {'### reviews, sorted by'}
        </div>
        <div id="sort-dropdown">
          {`${sortType}`}
          <FontAwesomeIcon
            icon={thin('angle-down')}/>
        </div>
        <select
          id="sort-type"
          onChange={() => handleSortType(setSort, setType)}
        >
          <option value="relevant">Relevant</option>
          <option value="newest">Newest</option>
          <option value="helpful">Helpful</option>
        </select>
      </div>
      <div id='reviews'>
        {reviews
          ? reviews.map((review) => (
            <Review key={review.review_id} review={review} />
            ))
          : ''
        }
      </div>
    </div>
  );
}

export default ReviewsList;

{/* <div id="reviews-list">
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
  {reviews
    ? reviews.map((review) => (
      <Review key={review.review_id} review={review} />
      ))
    : ''
  }
</ul>
</div> */}
