import React, { useState, useEffect } from 'react';
import ProductBreakdown from './ProductBreakdown.jsx';

import {
  createStarsRating,
  getMetadata,
  metadata,
  ratings,
} from './helper_functions/ratings_bd.js';

function RatingsBreakdown({ productId, setCharacteristics, characteristics }) {
  const [ratingsGraphDiv, setRatingsGraphDiv] = useState(<div />);
  const [totalReviews, setTotalReviews] = useState('');
  const [metadata, setMetadata] = useState(metadata);
  const [ratings, setRatings] = useState(ratings);
  const [percentRec, setPercentRec] = useState('');
  const [avgRating, setAvgRating] = useState('');
  const [starsDiv, setStarsDiv] = useState(<div />)

  const setStates = {
    setCharacteristics,
    setRatingsGraphDiv,
    setTotalReviews,
    setPercentRec,
    setAvgRating,
    setStarsDiv,
    setMetadata,
    setRatings,
  };

  useEffect(() => {
    getMetadata(productId, setStates);
  }, [productId]);

  return (
    <div id="ratings-breakdown">
      <div id='average-rating'>
        <div id='average'>{`${avgRating}`}</div>
        <div id='breakdown-stars'>
          {starsDiv}
        </div>
      </div>
      <div id='review-count'>{`out of ${totalReviews} reviews`}</div>
      <br></br>
      <div id="recommend-percent">
        {`${percentRec}% of reviewers recommend this product`}
      </div>
      <br></br>
      {ratingsGraphDiv}
      <br></br>
      <ProductBreakdown characteristics={characteristics} />
    </div>
  );
}

export default RatingsBreakdown;
