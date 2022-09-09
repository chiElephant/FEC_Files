import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  light,
  thin,
} from '@fortawesome/fontawesome-svg-core/import.macro';

// ******************** Initial State Variables ******************** //

const metadata = {
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
function filterReviews(rating) {

}

function handleRatingsPercent(ratings) {
  let sum = 0;

  let percentKey = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  for (let rating in ratings) {
    sum += parseInt(ratings[rating]);
  }

  for (let rating in ratings) {
    const value = ratings[rating];
    percentKey[rating] = Math.floor((value / sum) * 100);
  }
  return percentKey;
}

async function createRatingsGraphDiv(ratings, setRatingsGraphDiv) {
  const ratingsPercent = await handleRatingsPercent(ratings);
  setRatingsGraphDiv([
      <div id="five-star" key="5" >
        <div className="graph-text" onClick={(e) => filterReviews(5)}>
          5 stars
        </div>
        <div className="graph-meter">
          <span style={{ width: ratingsPercent[5] + '%' }}></span>
        </div>
        <div className="graph-rating">{ratings[5]}</div>
      </div>,

      <div id="four-star" key="4">
        <div className="graph-text" onClick={() => filterReviews(4)}>
          4 stars
        </div>
        <div className="graph-meter">
          <span style={{ width: ratingsPercent[4] + '%' }}></span>
        </div>
        <div className="graph-rating">{ratings[4]}</div>
      </div>,

      <div id="three-star" key="3">
        <div className="graph-text" onClick={() => filterReviews(3)}>
          3 stars
        </div>
        <div className="graph-meter">
          <span style={{ width: ratingsPercent[3] + '%' }}></span>
        </div>
        <div className="graph-rating">{ratings[3]}</div>
      </div>,

      <div id="two-star" key="2">
        <div className="graph-text" onClick={() => filterReviews(2)}>2 stars</div>
        <div className="graph-meter">
          <span style={{ width: ratingsPercent[2] + '%' }}></span>
        </div>
        <div className="graph-rating">{ratings[2]}</div>
      </div>,

      <div id="one-star" key="1">
        <div className="graph-text" onClick={() => filterReviews(1)}>1 stars</div>
        <div className="graph-meter">
          <span style={{ width: ratingsPercent[1] + '%' }}></span>
        </div>
        <div className="graph-rating">{ratings[1]}</div>
      </div>
  ]);
}

function handleRecommend(recommend, setPercentRec) {
  const noCount = recommend.false;
  const yesCount = recommend.true;
  const totalCount = noCount + yesCount;
  const avg = Math.floor((yesCount / totalCount) * 100);

  setPercentRec(avg);
}

function handleRatings(ratings, setAvgRating, setTotalReviews, setStarsDiv) {
  let reviewsCount = 0;
  let sum = 0;
  let avg = 0;

  for (const rating in ratings) {
    const key = parseInt(rating, 10);
    const value = parseInt(ratings[rating], 10);

    reviewsCount += value;
    sum += key * value;
  }

  avg = (sum / reviewsCount).toFixed(1);

  createStarsRating(avg, setStarsDiv);
  setTotalReviews(reviewsCount);
  setAvgRating(avg);
}

function getMetadata(product_id, setState) {
  const options = {
    params: { product_id },
  };

  axios
    .get('/reviews/meta', options)
    .then((meta) => {
      setState.setMetadata(meta.data);
      setState.setCharacteristics(meta.data.characteristics);
      setState.setRatings(meta.data.ratings);
      return meta.data;
    })
    .then((metadata) => {
      createRatingsGraphDiv(metadata.ratings, setState.setRatingsGraphDiv);
      handleRatings(
        metadata.ratings,
        setState.setAvgRating,
        setState.setTotalReviews,
        setState.setStarsDiv
      );
      handleRecommend(metadata.recommended, setState.setPercentRec);
    })
    .catch((err) => console.log('Error fetching metadata: ', err));
}

function createStarsRating(rating, setStarsDiv) {
  let starRating = [];
  if (rating !== 0) {
    for (let i = 1; i <= rating; i++) {
      starRating.push(
        <FontAwesomeIcon
          key={`${i}-solid`}
          className="star"
          icon={solid('star-sharp')}
        />
      );
    }
    for (let i = rating; i < 5; i++) {
      starRating.push(
        <FontAwesomeIcon
          key={`${i}-regular`}
          className="star"
          icon={light('star-sharp')}
        />
      );
    }
  }
  setStarsDiv(starRating);
}

export { metadata, ratings, characteristics, getMetadata, createStarsRating };
