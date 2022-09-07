import React, { useState, useEffect } from 'react';
import ProductBreakdown from './ProductBreakdown.jsx';

import {
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

  const setStates = {
    setCharacteristics,
    setRatingsGraphDiv,
    setTotalReviews,
    setPercentRec,
    setAvgRating,
    setMetadata,
    setRatings,
  };

  useEffect(() => {
    getMetadata(productId, setStates);
  }, [productId]);

  return (
    <div id="ratings-breakdown">
      <div>{`Average Rating: ${avgRating}`}</div>
      <div>{`Total Reviews: ${totalReviews}`}</div>
      <br></br>
      <div id="rec-percent">
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
