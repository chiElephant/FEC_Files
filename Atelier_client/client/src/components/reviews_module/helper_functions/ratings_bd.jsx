import axios from 'axios';

// ******************** Initial State Variables ******************** //

var metadata = {

  'product_id': null,
  'ratings': {
      '1': null,
      '2': null,
      '3': null,
      '4': null,
      '5': null
  },
  'recommended': {
      'false': null,
      'true': null
  },
  'characteristics': {
      'Size': {
        'id': null,
        'value': null
      },
      'Fit': {
        'id': null,
        'value': null
      },
      'Width': {
          'id': null,
          'value': null
      },
      'Length': {
          'id': null,
          'value': null
      },
      'Comfort': {
          'id': null,
          'value': null
      },
      'Quality': {
          'id': null,
          'value': null
      }
  }

}

const ratings  =  metadata.ratings
const characteristics = metadata.Characteristics;

// ******************** Helper Functions ******************** //

function handleRatings (ratings, setRatings, setAvgRating, setTotalReviews) {
  let reviewsCount = 0;
  let sum = 0;
  let avg;

  for (const rating in ratings) {
    const key = parseInt(rating, 10)
    const value = parseInt(ratings[rating], 10)

    reviewsCount += value;
    sum += (key * value);
  }

  avg = (sum/reviewsCount).toFixed(1);

  setRatings(ratings);
  setAvgRating(avg);
  setTotalReviews(reviewsCount)
}

function handleRecommend (recommend, setPercentRec) {
  const noCount = recommend.false;
  const yesCount = recommend.true;
  const totalCount = noCount + yesCount;
  const avg = Math.floor(((yesCount / totalCount) * 100));

  setPercentRec(avg);
}

function getMetadata (product_id, {setMetadata, setAvgRating, setPercentRec, setRatingsDiv, setRatings, setTotalReviews})  {

  let meta = {};
  const options = {
    params: { product_id }
  }
  axios.get('/reviews/meta', options)
  .then(res => {
    setMetadata(res.data)
    handleRecommend(res.data.recommended, setPercentRec)
    handleRatings(res.data.ratings, setRatings, setAvgRating, setTotalReviews)
    createRatingsDiv(res.data.ratings, setRatingsDiv);
  })
  .catch(err => {
    console.log(err)
  })

  return meta

}

function createRatingsDiv (ratings, setRatingsDiv) {

  setRatingsDiv ([
    <div id='ratings-graph' key='0'>
      <div
        id='five-star'
        key='5'>
          5 stars: {ratings[5]}</div>
      <div
        id='four-star'
        key='4'>
          4 stars: {ratings[4]}</div>
      <div
        id='three-star'
        key='3'>
          3 stars: {ratings[3]}</div>
      <div
        id='two-star'
        key='2'>
          2 stars: {ratings[2]}</div>
      <div
        id='one-star'
        key='1'>
          1 stars: {ratings[1]}</div>
    </div>
  ])
}

export { metadata, ratings, characteristics, getMetadata }
