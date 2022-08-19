import axios from 'axios';

const getReviews = (product_id, sortType, setReviews) => {

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
}

const handleShown = () => {
  const show = reviews.slice(0, countShown);

  setReviewsShown(show)
}

const closeReview = () => {
  showReviewModal(false);
}

const setSort = (type) => {
  setSortType(type);
}

const handleClick = (cb, value) => {
  cb(value);
}

export { getReviews }