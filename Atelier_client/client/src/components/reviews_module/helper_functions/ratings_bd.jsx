import axios from 'axios';

// ******************** Initial State Variables ******************** //

var metadata = {

  'product_id': '',
  'ratings': {
      '1': '',
      '2': '',
      '3': '',
      '4': '',
      '5': ''
  },
  'recommended': {
      'false': '',
      'true': ''
  },
  'characteristics': {
      'Size': {
        'id': '',
        'value': ''
      },
      'Fit': {
        'id': '',
        'value': ''
      },
      'Width': {
          'id': '',
          'value': ''
      },
      'Length': {
          'id': '',
          'value': ''
      },
      'Comfort': {
          'id': '',
          'value': ''
      },
      'Quality': {
          'id': '',
          'value': ''
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

function getMetadata (
    product_id, setMetadata, setRatings, setAvgRating, setTotalReviews, setPercentRec, setCharacteristics, setRatingsDiv
  )  {

  const options = {
    params: { product_id }
  }
  axios.get('/reviews/meta', options)
  .then(res => {
    setMetadata(res.data)
    setCharacteristics(res.data.characteristics)
    handleRecommend(res.data.recommended, setPercentRec)
    handleRatings(res.data.ratings, setRatings, setAvgRating, setTotalReviews)
    createRatingsDiv(res.data.ratings, setRatingsDiv);
  })
  .catch(err => {
    console.log(err)
  })
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
