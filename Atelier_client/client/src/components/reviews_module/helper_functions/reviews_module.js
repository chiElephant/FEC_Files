import axios from 'axios';

const initialReviewState = [
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
];

const initialFilters = { 5: true, 4: true, 3: true, 2: true, 1: true };

function getReviewsCount(product_id, sort, count, setReviewCount) {
  const options = {
    params: { product_id, sort, count },
  };

  axios
    .get('/reviews/count', options)
    .then((response) => {
      setReviewCount((prevState) => response.data);
    })
    .catch((error) => {
      console.log('Error fetching reviews count: ', error);
    });
}

function getReviews(product_id, sort, count, currentFilters, setReviewsShown) {
  const options = {
    params: { product_id, sort, count },
  };

  axios
    .get('/reviews', options)
    .then((response) => {
      filterReviews(response.data, currentFilters, setReviewsShown);
    })
    .catch((error) => {
      console.log('Error fetching reviews: ', error);
    });
}

function filterReviews(reviews, currentFilters, setReviewsShown) {
  let filteredReviews = [];
  let filterCount = 0;
  let reviewsToShow;

  const filtersIndx = Object.values(currentFilters).indexOf(false);

  for (let review of reviews) {
    if (!currentFilters[review.rating]) {
      filteredReviews.push(review);
    }
  }

  if (filteredReviews.length === 0 && filtersIndx < 0) {
    setReviewsShown(reviews);
    return;
  }
  setReviewsShown((reviewsShown) => filteredReviews);
}

export { getReviewsCount, getReviews, initialReviewState, initialFilters, filterReviews };
