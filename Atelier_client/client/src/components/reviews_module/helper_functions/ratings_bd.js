import axios from 'axios';

// ******************** Helper Functions ******************** //

const helpers = {
  handleRatingsPercent: function (ratings) {

    const currentRatings = ratings.current.ratings

    let sum = 0;

    let percentKey = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    for (let rating in currentRatings) {
      sum += parseInt(currentRatings[rating]);
    }

    for (let rating in currentRatings) {
      const value = currentRatings[rating];
      percentKey[rating] = Math.floor((value / sum) * 100);
    }
    return percentKey;
  },

  createRatingsBD: function(ratings, setRatingsBreakdown, setCurrentFilters) {

    const ratingsPercent = helpers.handleRatingsPercent(ratings);
    const currentRatings = ratings.current.ratings;
    let ratingsGraphDiv = [<div key="ratingsBD"/>];

    if (currentRatings) {
      const NUM_BARS = 5;
      ratingsGraphDiv = [];

      for (var i = NUM_BARS; i > 0; i--) {
        ratingsGraphDiv.push(
          <div id="filter-star" key={i}>
            <div
              id={`filter-star-${i}`}
              className="graph-text"
              data-id={`${i}`}
              onClick={(e) => handleFilters(e.target, setCurrentFilters)}
            >
              {`${i} stars`}
            </div>
            <div className="graph-meter">
              <span style={{ width: ratingsPercent[i] + '%' }}></span>
            </div>
            <div className="graph-rating">{currentRatings[i]}</div>
          </div>
        );
      }
      setRatingsBreakdown(() => ratingsGraphDiv);
      console.log(ratingsGraphDiv)
    }
    return ratingsGraphDiv;

  },

  getMetadata: function (product_id, cb) {
    const options = {
      params: { product_id },
    };

    axios
      .get('/reviews/meta', options)
      .then((meta) => {
        cb(meta.data);
      })
      .catch((err) => console.log('Error fetching metadata: ', err));
  },
};

export default helpers;
