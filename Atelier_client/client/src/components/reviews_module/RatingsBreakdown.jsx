import React, { useState, useEffect } from 'react';
import ProductBreakdown from './ProductBreakdown.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, light } from '@fortawesome/fontawesome-svg-core/import.macro';

import helpers from './helper_functions/ratings_bd.js';

function RatingsBreakdown({ productId, setCharacteristics, characteristics }) {
  const [ratingsGraphDiv, setRatingsGraphDiv] = useState(<div />);
  const [starsDiv, setStarsDiv] = useState(<div />);

  const [totalReviews, setTotalReviews] = useState('');
  const [percentRec, setPercentRec] = useState('');
  const [avgRating, setAvgRating] = useState('');

  useEffect(() => {
    helpers.getMetadata(productId, handleMetadata);
  }, [productId]);

  function handleMetadata(metadata) {
    setCharacteristics(() => metadata.characteristics);
    handleRatings(metadata.ratings);
    handleRecommend(metadata.recommended);
    createRatingsGraphDiv(metadata.ratings);
  }

  async function createRatingsGraphDiv(ratings) {
    const ratingsPercent = await helpers.handleRatingsPercent(ratings);
    const ratingsGraphDiv = [];

    for (var i = 5; i > 0; i--) {
      ratingsGraphDiv.push(
        <div id="five-star" key={i}>
          <div className="graph-text" onClick={() => helpers.filterReviews(i)}>
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

    if (avg !== 0) {
      for (let i = 1; i <= avg; i++) {
        starRatingDiv.push(
          <FontAwesomeIcon
            key={`${i}-solid`}
            className="star"
            icon={solid('star-sharp')}
          />
        );
      }

      for (let i = avg; i < 5; i++) {
        starRatingDiv.push(
          <FontAwesomeIcon
            key={`${i}-regular`}
            className="star"
            icon={light('star-sharp')}
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
