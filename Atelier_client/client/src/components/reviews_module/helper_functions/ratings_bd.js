import axios from 'axios';

// ******************** Helper Functions ******************** //

const helpers = {
  handleRatingsPercent: function (ratings) {
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
  },

  getMetadata: function (product_id, handleMetadata) {
    const options = {
      params: { product_id },
    };

    axios
      .get('/reviews/meta', options)
      .then((meta) => {
        handleMetadata(meta.data);
      })
      .catch((err) => console.log('Error fetching metadata: ', err));
  },
};

export default helpers;
