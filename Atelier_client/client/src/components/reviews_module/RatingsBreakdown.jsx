import React, { useState, useEffect, useMemo, useRef } from 'react';
import ProductBreakdown from './ProductBreakdown.jsx';

import helpers from './helper_functions/ratings_bd.js';

function RatingsBreakdown({
  product_id,
  setCharacteristics,
  characteristics,
  setCurrentFilters,
  currentFilters,
}) {
  const [ratingsBreakdown, setRatingsBreakdown] = useState(<div />);
  const [starsDiv, setStarsDiv] = useState(<div />);

  const [totalReviews, setTotalReviews] = useState('');
  const [percentRec, setPercentRec] = useState('');
  const [avgRating, setAvgRating] = useState('');

  const metadata = useRef({});

  const ratingsBreakDown = useMemo(() => {
    return helpers.createRatingsBD(metadata, setRatingsBreakdown, setCurrentFilters)
  }, [metadata.current])

  const characteristicsBD = useMemo(() => {
    console.log('CharsUPDATED')
  }, [characteristics])

  useEffect(() => {
    helpers.getMetadata(product_id, (meta) => {
      console.log('RENDER')
      metadata.current = meta;
      setCharacteristics(() => meta.characteristics);
      // handleRatings(meta.ratings);
      // handleRecommend(meta.recommend);
      // helpers.createRatingsBD(meta.ratings, setRatingsBreakdown, setCurrentFilters)
    });
  }, [product_id]);



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

  function createStarsRatingDiv(avg) {
    let starRatingDiv = [];

    const NUM_STARS = 5;

    const base = Math.floor(avg);
    const remainder = avg - base;
    let starFraction;

    if (remainder < 0.25) {
      starFraction = 'none';
    }
    if (0.25 <= remainder && remainder < 0.5) {
      starFraction = 'quarter';
    }
    if (0.5 <= remainder && remainder < 0.75) {
      starFraction = 'half';
    }
    if (0.75 <= remainder) {
      starFraction = 'three-quarter';
    }

    if (avg !== 0) {
      for (let i = 1; i <= base; i++) {
        starRatingDiv.push(
          <i className="fak fa-star-solid star" key={`${i}-solid`}></i>
        );
      }

      if (starFraction !== 'none') {
        starRatingDiv.push(
          <i className="fak fa-star-half-stroke-solid" key="star-fraction"></i>
        );
      }

      const start = base + 1;

      for (let i = start; i < NUM_STARS; i++) {
        starRatingDiv.push(
          <i className="fak fa-star-thin star" key={`${i}-regular`}></i>
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
      <div id="ratings-graph">{ratingsBreakDown}</div>
      <ProductBreakdown characteristics={characteristics} />
    </div>
  );
}

export default RatingsBreakdown;
