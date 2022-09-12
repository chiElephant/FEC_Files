import axios from 'axios';

const initialReviewState = [
  {
    review_id: 12345,
    rating: '',
    summary: '',
    recommend: '',
    response: null,
    body: '',
    date: '',
    reviewer_name: '',
    helpfulness: '',
    photos: [],
  },
];

const initialFilters = { 5: false, 4: false, 3: false, 2: false, 1: false };

function getReviews(params, currentFilters, handleReviewData) {
  const options = { params };

  axios
    .get('/reviews', options)
    .then((response) => {
      handleReviewData(response.data);
    })
    .catch((error) => {
      console.log('Error fetching reviews: ', error);
    });
}

function filterReviews(reviews, currentFilters, countShown, setReviewsShown) {
  let filteredReviews = [];

  const filtersIndx = Object.values(currentFilters).indexOf(true);

  if (filtersIndx > 0) {
    for (let review of reviews.current) {
      if (currentFilters[review.rating]) {
        filteredReviews.push(review);
      }
    }
    setReviewsShown(filteredReviews);
    return;
  }

  const reviewsToDisplay = reviews.current.slice(0, countShown);
  setReviewsShown(reviewsToDisplay);
}

export { getReviews, initialReviewState, initialFilters, filterReviews };
