import React, { useState, useEffect } from 'react';
import ProductBreakdown from './ProductBreakdown.jsx';

import { getMetadata, metadata, ratings, characteristics } from './helper_functions/ratings_bd.jsx';

function RatingsBreakdown ( {product_id} ) {

  const [metadata, setMetadata] = useState(metadata);
  const [ratings, setRatings] = useState(ratings);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0)
  const [percentRec, setPercentRec] = useState(0);
  const [characteristics, setCharacteristics] = useState(characteristics);
  const [ratingsDiv, setRatingsDiv] = useState('');

  useEffect(() => {
    getMetadata (
      product_id, setMetadata, setRatings, setAvgRating, setTotalReviews,
      setPercentRec, setCharacteristics, setRatingsDiv
    )
  }, [product_id])

  return (
    <div>
      <h3>Ratings Breakdown</h3>
      <div>{`Average Rating: ${avgRating}`}</div>
      <div>{`Total Reviews: ${totalReviews}`}</div>
      <br></br>
      <div id="rec-percent">{`${percentRec}% of reviewers recommend this product`}</div>
      <br></br>
        {ratingsDiv}
      <br></br>
      <ProductBreakdown
        characteristics={characteristics}/>
    </div>
  )
}

export default RatingsBreakdown;