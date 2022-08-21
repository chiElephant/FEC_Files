import axios from 'axios';

const initial = {
  reviewModel: [
    {
      review_id: 12345,
      rating: null,
      summary: null,
      recommend: null,
      response: null,
      body: null,
      date: null,
      reviewer_name: null,
      helpfulness: null,
      photos: [],
    },
  ],
};

const helpers = {
  handleShown: (reviews, countShown, setReviewsShown) => {
    const show = reviews.slice(0, countShown);

    setReviewsShown(show);
  },

  submitReview: (setShowReviewModal) => {
    setShowReviewModal(false);
  },

  setSort: (type, setType) => {
    setType(type);
  },

  handleClick: (cb, value) => {
    cb(value);
  },

  getReviews: (product_id, sortType, setReviews) => {
    const options = {
      params: { product_id, sort: sortType },
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
