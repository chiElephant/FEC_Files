import React, { useState, useEffect } from 'react';
import ProductBreakdown from './ProductBreakdown.jsx';
import axios from 'axios';

function RatingsBreakdown ( {product_id} ) {

  const [metadata, setMetadata] = useState([]);
  const [ratings, setRatings] = useState ({});
  const [recommend, setRecommend] = useState({});
  const [avgRating, setAvgRating] = useState(0);
  const [characteristics, setCharacteristics] = useState({});
  const [totalReviews, setTotalReviews] = useState(0)
  const [recsDiv, setRecsDiv] = useState([])
  const [yesRec, setYesRec] = useState(0);
  const [noRec, setNoRec] = useState(0);



  useEffect(() => {
    getMetaData()
  }, [product_id])

  const getMetaData = () => {
    const options = {
      params: { product_id }
    }

    axios.get('/reviews/meta', options)
    .then(res => {
      handleMetadata(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleMetadata = (metadata) => {
    setMetadata(metadata)
    setCharacteristics(metadata.characteristics)

    handleRatings(metadata.ratings)
    handleRecommend(metadata.recommended)
  }

  const handleRatings = (ratings) => {

    let reviewsCount = 0;
    let sum = 0;
    let avg = 0;

    for (const rating in ratings) {
      const key = parseInt(rating, 10)
      const value = parseInt(ratings[rating], 10)

      reviewsCount += value;
      sum += (key * value);

      avg = (sum/reviewsCount).toFixed(1);
    }

    setAvgRating(avg);
    setTotalReviews(reviewsCount)
    setRatings(ratings);
  }

  const handleRecommend = (recCount) => {
    const noCount = recCount.false;
    const yesCount = recCount.true;

    const recsDiv = ([
    ])

    setRecsDiv(recsDiv);
    setYesRec(yesCount);
    setNoRec(noCount);

  }

  return (
    <div>
      <h3>Ratings Breakdown</h3>
      <div>{`Average Rating: ${avgRating}`}</div>
      <div>{`Total Reviews: ${totalReviews}`}</div>
      <h4>Breakdown Graph</h4>
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
      <h4>Recommended</h4>
      <div id="yes-rec">
          {`Yes: ${yesRec}`}
      </div>
      <div id="no-rec">
          {`No: ${noRec}`}
      </div>
      <ProductBreakdown
        metadata={characteristics}/>
    </div>
  )
}

export default RatingsBreakdown;