import React, { useState, useEffect } from 'react';
import ProductBreakdown from './ProductBreakdown.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import helpers from './helper_functions/ratings_bd.js';

function RatingsBreakdown({
  productId,
  setCharacteristics,
  characteristics,
  setCurrentFilters,
  currentFilters,
}) {
  const [ratingsGraphDiv, setRatingsGraphDiv] = useState(<div />);
  const [starsDiv, setStarsDiv] = useState(<div />);

  const [totalReviews, setTotalReviews] = useState('');
  const [percentRec, setPercentRec] = useState('');
  const [avgRating, setAvgRating] = useState('');

  useEffect(() => {
    helpers.getMetadata(productId, handleMetadata, currentFilters);
  }, [productId]);

  function handleMetadata(metadata) {
    setCharacteristics(() => metadata.characteristics);
    handleRatings(metadata.ratings);
    handleRecommend(metadata.recommended);
    createRatingsGraphDiv(metadata.ratings);
  }

  function handleFilters(target) {
    const className = target.className;
    const rating = target.dataset.id;
    const id = target.id;

    if (className === 'graph-text') {
      const element = document.getElementById(id);
      element.classList.add('graph-text-filter');
    } else {
      const element = document.getElementById(id);
      element.classList.remove('graph-text-filter');
    }

    setCurrentFilters((currentFilters) => ({
      ...currentFilters,
      [rating]: !currentFilters[rating],
    }));
  }

  async function createRatingsGraphDiv(ratings) {
    const ratingsPercent = await helpers.handleRatingsPercent(ratings);
    const ratingsGraphDiv = [];

    const NUM_BARS = 5;

    for (var i = NUM_BARS; i > 0; i--) {
      ratingsGraphDiv.push(
        <div id="filter-star" key={i}>
          <div
            id={`filter-star-${i}`}
            className="graph-text"
            data-id={`${i}`}
            onClick={(e) => handleFilters(e.target, setCurrentFilters)}
          >
            {`${i} stars`}
          </div>
          <div className="graph-meter">
            <span style={{ width: ratingsPercent[i] + '%' }}></span>
          </div>
          <div className="graph-rating">{ratings[i]}</div>
        </div>
      );
    }
    setRatingsGraphDiv(() => ratingsGraphDiv);
  }

  function createStarsRatingDiv(avg) {
    let starRatingDiv = [];

    const NUM_STARS = 5;

    const base = Math.floor(avg);
    const remainder = avg - base;
    let starFraction;

    if (remainder < 0.25) {
      starFraction = 'none';
      console.log('none');
    }
    if ( 0.25 <= remainder && remainder < 0.5) {
      starFraction = 'quarter';
      console.log('quarter');
    }
    if ( 0.5 <= remainder && remainder < 0.75) {
      starFraction = 'half';
      console.log('half')
    }
    if ( 0.75 <= remainder) {
      starFraction = 'three-quarter';
      console.log('three-quarter')
    }

    if (avg !== 0) {
      for (let i = 1; i <= base; i++) {
        starRatingDiv.push(
          <FontAwesomeIcon
            key={`${i}-solid`}
            className="star"
            icon={solid('star')}
          />
        );
      }

      // starRatingDiv.push (
      //   <FontAwesomeIcon key="star-fraction" icon={solid("star-sharp-half-stroke")} />
      // )

      const start = base + 1;

      for (let i = start; i < NUM_STARS; i++) {
        starRatingDiv.push(
          <FontAwesomeIcon
            key={`${i}-regular`}
            className="star"
            icon={regular('star')}
          />
        );
      }
    }

    setStarsDiv((starsDiv) => starRatingDiv);
  }

  function handleRecommend(recommended) {
    const noCount = recommended.false;
    const yesCount = recommended.true;
    const totalCount = noCount + yesCount;
    const avg = Math.floor((yesCount / totalCount) * 100);

    setPercentRec(() => avg);
  }

  function handleRatings(ratings) {
    let reviewsCount = 0;
    let sum = 0;
    let avg = 0;

    for (const rating in ratings) {
      const key = parseInt(rating, 10);
      const value = parseInt(ratings[rating], 10);

      reviewsCount += value;
      sum += key * value;
    }

    avg = (sum / reviewsCount).toFixed(1);

    createStarsRatingDiv(avg);
    setTotalReviews((totalReviews) => reviewsCount);
    setAvgRating((avgRating) => avg);
  }

  return (
    <div id="ratings-breakdown">
      <div id="average-rating">
        <div id="average">{`${avgRating}`}</div>
        <div id="breakdown-stars">{starsDiv}</div>
      </div>
      <div id="review-count">{`out of ${totalReviews} reviews`}</div>
      <div id="recommend-percent">
        {`${percentRec}% of reviewers recommend this product`}
      </div>
      <div id="ratings-graph">{ratingsGraphDiv}</div>
      <ProductBreakdown characteristics={characteristics} />
    </div>
  );
}

export default RatingsBreakdown;
