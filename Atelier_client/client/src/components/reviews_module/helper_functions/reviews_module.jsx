import axios from 'axios';

const initial = {
  reviewModel: [
    {
      review_id: 12345,
      rating: '',
      summary: '',
      recommend: '',
      response: '',
      body: '',
      date: '',
      reviewer_name: '',
      helpfulness: '',
      photos: [],
    },
  ],
};

const helpers = {
  handleShown: (reviews, countShown, setReviewsShown) => {
    const show = reviews.slice(0, countShown);
    setReviewsShown(show);
  },

  setSort: (type, setType) => {
    setType(type);
  },

  handleClick: (cb, value) => {
    cb(value);
  },

  getReviews: (product_id, sort, setReviews) => {
    const options = {
      params: { product_id, sort },
    };

    axios
      .get('/reviews', options)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log('Error fetching reviews: ', error);
      });
  },
};

export { helpers, initial };
