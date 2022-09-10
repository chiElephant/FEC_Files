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

function getReviews (product_id, sort, count, setReviews, setReviewCount) {
  const options = {
    params: { product_id, sort, count },
  };

  axios
    .get('/reviews', options)
    .then((response) => {
      setReviews(prevReviews => response.data);
      setReviewCount(prevReviewCount => response.data.length)
    })
    .catch((error) => {
      console.log('Error fetching reviews: ', error);
    });
};

export { getReviews, initialReviewState };
