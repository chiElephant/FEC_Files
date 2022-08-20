import axios from 'axios';

// ******************** Initial State Variables ******************** //

var metadata = {
  ratings: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
  recommended: {
    false: 0,
    true: 0,
  },
  characteristics: {
    Size: {
      id: '01',
      value: 0,
    },
    Fit: {
      id: '02',
      value: 0,
    },
    Width: {
      id: '03',
      value: 0,
    },
    Length: {
      id: '04',
      value: 0,
    },
    Comfort: {
      id: '05',
      value: 0,
    },
    Quality: {
      id: '06',
      value: 0,
    },
  },
};

const ratings = metadata.ratings;
const characteristics = metadata.Characteristics;

// ******************** Helper Functions ******************** //

function createRatingsGraphDiv(ratings, setRatingsGraphDiv) {
  setRatingsGraphDiv([
    <div id="ratings-graph" key="0">
      <div id="five-star" key="5">
        5 stars: {ratings[5]}
      </div>
      <div id="four-star" key="4">
        4 stars: {ratings[4]}
      </div>
      <div id="three-star" key="3">
        3 stars: {ratings[3]}
      </div>
      <div id="two-star" key="2">
        2 stars: {ratings[2]}
      </div>
      <div id="one-star" key="1">
        1 stars: {ratings[1]}
      </div>
    </div>,
  ]);
}

function handleRecommend(recommend, setPercentRec) {
  const noCount = recommend.false;
  const yesCount = recommend.true;
  const totalCount = noCount + yesCount;
  const avg = Math.floor((yesCount / totalCount) * 100);

  setPercentRec(avg);
}

function handleRatings(ratings, setAvgRating, setTotalReviews) {
  let reviewsCount = 0;
  let sum = 0;
  let avg;

  for (const rating in ratings) {
    const key = parseInt(rating, 10);
    const value = parseInt(ratings[rating], 10);

    reviewsCount += value;
    sum += key * value;
  }

  avg = (sum / reviewsCount).toFixed(1);

  setTotalReviews(reviewsCount);
  setAvgRating(avg);
}

function getMetadata(
  product_id,
  {
    setMetadata,
    setAvgRating,
    setPercentRec,
    setRatingsGraphDiv,
    setRatings,
    setTotalReviews,
    setCharacteristics,
  }
) {
  const options = {
    params: { product_id },
  };

  axios
    .get('/reviews/meta', options)
    .then((res) => {
      handleRatings(res.data.ratings, setAvgRating, setTotalReviews);
      createRatingsGraphDiv(res.data.ratings, setRatingsGraphDiv);
      handleRecommend(res.data.recommended, setPercentRec);
      setCharacteristics(res.data.characteristics);
      setRatings(res.data.ratings);
      setMetadata(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { metadata, ratings, characteristics, getMetadata };
