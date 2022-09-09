require('dotenv').config();
const axios = require('axios');

const { URL, TOKEN } = process.env

const helpfulEndpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/:review_id/helpful`;

const getReviews = (req, res, next) => {
  const url = `${URL}/reviews`

  const options = {
    headers: { Authorization: TOKEN },
    params: req.query,
  };

  axios
    .get(url, options)
    .then((response) => {
      res.body = response.data.results;
      next();
    })
    .catch(next);
};

const getMetaData = (req, res, next) => {
  const url = `${URL}/reviews/meta`
  const options = {
    headers: { Authorization: TOKEN },
    params: req.query,
  };

  axios
    .get(url, options)
    .then((response) => {
      res.body = response.data;
      next();
    })
    .catch(next);
};

const postReview = (req, res, next) => {
  const {
    body,
    name,
    email,
    product_id,
    rating,
    summary,
    recommend,
    photoUrls,
    characteristics,
  } = req.body;

  const data = JSON.stringify({
    product_id,
    rating,
    summary,
    body,
    recommend,
    name,
    email,
    photos: photoUrls,
    characteristics,
  });

  console.log(data);

  const options = {
    method: 'post',
    url: `${URL}/reviews`,
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/json',
    },
    data,
  };

  // axios(options)
  //   .then((res) => {
  //     next();
  //   })
  //   .catch(next);
};

const markHelpful = (params, cb) => {

  const url = `${URL}/reviews/${params.review_id}/helpful`;

  const options = {
    method: 'put',
    url,
    headers: {
      Authorization: TOKEN,
    },
  };

  axios(options)
    .then(res => cb(res.status))
    .catch(err => console.log('Axios express helper error'))
};

module.exports = {
  getReviews,
  getMetaData,
  postReview,
  markHelpful,
};
