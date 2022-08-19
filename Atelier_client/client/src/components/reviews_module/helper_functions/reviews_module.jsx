import axios from 'axios';

const helpers = {
  getReviews: (product_id, sortType, setReviews) => {

    const options = {
      params: { product_id, sort: sortType }
    }

    axios.get('/reviews', options)
    .then(response => {
      setReviews(response.data)
    })
    .catch(error => {
      console.log(error);
    })
  },

  handleShown: (reviews, countShown, setReviewsShown) => {
    const show = reviews.slice(0, countShown);

    setReviewsShown(show)
  },

  closeReview: () => {
    showReviewModal(false);
  },

  setSort: (type) => {
    setSortType(type);
  },

  handleClick: (cb, value) => {
  cb(value);
  }
}

export default helpers;