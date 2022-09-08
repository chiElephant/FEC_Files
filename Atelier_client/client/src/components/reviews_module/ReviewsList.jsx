import React, { useState, onEffect } from 'react';
import Review from './Review.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { light } from '@fortawesome/fontawesome-svg-core/import.macro';


function ReviewsList({ reviews, setSortType, reviewCount }) {
  const [currentSort, setCurrentSort] = useState('relevance');

  function handleSort (sort) {
    const sortType = sort === 'relevant' ? 'relevance' : sort
    setCurrentSort(sortType);
    setSortType(sort);
  }

  return (
    <div id="reviews-list">
      <div id="review-sort">
        <div id="sort-text">
          {`${reviewCount} reviews, sorted by`}
        </div>
        <div id="sort-dropdown">
          {currentSort}
          <div id="sort-dropdown-content">
            <ul className='review-sort-types'>
              <li
                className='relevant'
                onClick={() => handleSort('relevant')}>
                {'relevance'}
              </li>
              <li
                className='newest'
                onClick={() => handleSort('newest')}>
                {'newest'}
              </li>
              <li
                className='helpful'
                onClick={() => handleSort('helpful')}>
                {'helpful'}
              </li>
            </ul>
          </div>
          <div id='sort-icon'>
            <FontAwesomeIcon
              icon={light('angle-down')}
              size='lg'/>
          </div>
        </div>
        {/* <select
          id="sort-type"
          onChange={() => handleSortType(setSort, setType)}
        >
          <option value="relevant">Relevant</option>
          <option value="newest">Newest</option>
          <option value="helpful">Helpful</option>
        </select> */}
      </div>
      <div id='reviews'>
        {reviews
          ? reviews.map((review) => (
            <Review
              key={review.review_id}
              review={review}
              helpfulnes={review.helpfulness}
              // rec={review.recomend}
              // res={review.response}
              // id={review.review_id}
              // username={review.username}
              // summary={review.summary}
              // photos={review.photos}
              // rating={review.rating}
              // body={review.body}
              // date={review.date}
              />
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
