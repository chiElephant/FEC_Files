import axios from 'axios';

const initialState = {
  review: [
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
  ],

  filters: { 5: false, 4: false, 3: false, 2: false, 1: false },
};

const helpers = {
  handleCountShown: (displayedCount, reviewCount, setDisplayedCount) => {
    if (displayedCount >= reviewCount.current) {
      const element = document.getElementById('more-reviews');
      element.remove();
    }
    setDisplayedCount((displayedCount) => displayedCount + 2);
  },

  getReviews: (params, currentFilters, handleReviewData) => {
    const options = { params };

    axios
      .get('/reviews', options)
      .then((response) => {
        handleReviewData(response.data);
      })
      .catch((error) => {
        console.log('Error fetching reviews: ', error);
      });
  },

  filterReviews: (reviews, currentFilters, displayedCount, setReviewsShown) => {
    let filteredReviews = [];

    const filtersIndx = Object.values(currentFilters).indexOf(true);
    if (filtersIndx >= 0) {
      for (let review of reviews.current) {
        if (currentFilters[review.rating]) {
          filteredReviews.push(review);
        }
      }
      setReviewsShown(filteredReviews);
      return;
    }

    const reviewsToDisplay = reviews.current.slice(0, displayedCount);
    setReviewsShown(reviewsToDisplay);
  },
};

export { initialState, helpers };
