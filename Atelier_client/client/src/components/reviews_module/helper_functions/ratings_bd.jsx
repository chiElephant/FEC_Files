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


var ratings  =  metadata.ratings

var characteristics = metadata.Characteristics;


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

function getMetaData (
  product_id, setMetadata, setRatings, setAvgRating, setTotalReviews, setPercentRec, setCharacteristics
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
  })
  .catch(err => {
    console.log(err)
  })
}

export { metadata, ratings, characteristics, handleRatings, handleRecommend, getMetaData }
