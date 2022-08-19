import React, { useState, useEffect } from 'react';
import ProductBreakdown from './ProductBreakdown.jsx';
import axios from 'axios';

import { handleRatings } from './helper_functions/ratings_bd.jsx'

const handleRecommend = (recommend, setPercentRec) => {
  const noCount = recommend.false;
  const yesCount = recommend.true;
  const totalCount = noCount + yesCount;
  const avg = Math.floor(((yesCount / totalCount) * 100));

  setPercentRec(avg);
}

const getMetaData = ( product_id, setMetadata, setRatings, setAvgRating, setTotalReviews, setPercentRec, setCharacteristics ) => {
  const options = {
    params: { product_id }
  }
  axios.get('/reviews/meta', options)
  .then(res => {
    setMetadata(res.data)
    setCharacteristics(res.data.characteristics)
    handleRecommend(res.data.recommended, setPercentRec)
    handleRatings(res.data.ratings, setRatings, setAvgRating, setTotalReviews)
  })
  .catch(err => {
    console.log(err)
  })
}

// *** Ratings Breakdown Component ***
function RatingsBreakdown ( {product_id} ) {

  const [metadata, setMetadata] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0)
  const [percentRec, setPercentRec] = useState(0);
  const [characteristics, setCharacteristics] = useState({});

  useEffect(() => {
    getMetaData (
      product_id, setMetadata, setRatings, setAvgRating, setTotalReviews, setPercentRec, setCharacteristics
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
      <div id='five-star'>
          5 stars: {ratings[5]}</div>
      <div id='four-star'>
          4 stars: {ratings[4]}</div>
      <div id='three-star'>
          3 stars: {ratings[3]}</div>
      <div id='two-star'>
          2 stars: {ratings[2]}</div>
      <div id='one-star'>
          1 stars: {ratings[1]}</div>
      <br></br>
      <ProductBreakdown
        metadata={characteristics}/>
    </div>
  )
}

export default RatingsBreakdown;