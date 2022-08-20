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

function createRatingsGraphDiv (ratings, setRatingsGraphDiv) {

  setRatingsGraphDiv ([
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


function handleRecommend (recommend, setPercentRec) {
  const noCount = recommend.false;
  const yesCount = recommend.true;
  const totalCount = noCount + yesCount;
  const avg = Math.floor(((yesCount / totalCount) * 100));

  setPercentRec(avg);
}

function handleRatings (ratings, setAvgRating, setTotalReviews) {
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

  setTotalReviews(reviewsCount);
  setAvgRating(avg);
}

function getMetadata (product_id, {setMetadata, setAvgRating, setPercentRec, setRatingsGraphDiv, setRatings, setTotalReviews, setCharacteristics})  {

  const options = {
    params: { product_id }
  }

  axios.get('/reviews/meta', options)
  .then(res => {
    handleRatings(res.data.ratings, setAvgRating, setTotalReviews);
    createRatingsGraphDiv(res.data.ratings, setRatingsGraphDiv);
    handleRecommend(res.data.recommended, setPercentRec);
    setRatings(res.data.ratings);
    setMetadata(res.data);
  })
  .catch(err => {
    console.log(err);
  })
}

export { metadata, ratings, characteristics, getMetadata }
