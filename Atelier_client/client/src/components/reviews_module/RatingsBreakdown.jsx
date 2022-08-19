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


  useEffect(() => {
    getMetaData()
  }, [])

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

  const handleMetadata = async (metadata) => {
    setMetadata(metadata)
    handleRatings(metadata.ratings)
    handleRecommend(metadata.recommended)
    // handleCharacteristics(metadata.characteristics)
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
      <div
        key="1">
          {`Yes: ${yesCount}`}
      </div>,
      <div
        key ="0">
          {`No: ${noCount}`}
      </div>
    ])

    setRecsDiv(recsDiv);

  }

  return (
    <div>
      <h3>Ratings Breakdown</h3>
      <div>{`Average Rating: ${avgRating}`}</div>
      <div>{`Total Reviews: ${totalReviews}`}</div>
      <h4>Breakdown Graph</h4>
      <div>5 stars: {ratings[5]}</div>
      <div>4 stars: {ratings[4]}</div>
      <div>3 stars: {ratings[3]}</div>
      <div>2 stars: {ratings[2]}</div>
      <div>1 stars: {ratings[1]}</div>
      <h4>Recommended</h4>
      {recsDiv}
      {/* <div>{`Yes: `}</div>
      <div>{`No: `}</div> */}

      <ProductBreakdown
        metadata={characteristics}/>
    </div>
  )
}

export default RatingsBreakdown;