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

const initialFilters = { 5: false, 4: false, 3: false, 2: false, 1: false };

function getReviews(product_id, sort, count, setReviews, setReviewCount) {
  const options = {
    params: { product_id, sort, count },
  };

  axios
    .get('/reviews', options)
    .then((response) => {
      setReviews((prevReviews) => response.data);
      setReviewCount((prevReviewCount) => response.data.length);
    })
    .catch((error) => {
      console.log('Error fetching reviews: ', error);
    });
}

function filterReviews(reviews, currentFilters, setReviewsShown) {
  console.log(`I'm  Filtering`, reviews, currentFilters);
  let filteredReviews = [];

  for(let review of reviews) {
    if(currentFilters[review.rating]) {
      filteredReviews.push(review)
    }
  }
  setReviewsShown((reviewsShown) => filteredReviews);
}

export { getReviews, initialReviewState, initialFilters, filterReviews };
