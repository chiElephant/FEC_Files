require('dotenv').config();
const axios = require('axios');


const endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/`;
const metaEndpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/`;
const token = process.env.TOKEN;

const getReviews = (req, res, next) => {
  const options = {
    headers: { Authorization: token },
    params: req.query,
  };

  axios
    .get(endpoint, options)
    .then((response) => {
      res.body = response.data.results;
      next();
    })
    .catch(next);
};

const getMetaData = (req, res, next) => {
  const options = {
    headers: { Authorization: token },
    params: req.query,
  };

  axios
    .get(metaEndpoint, options)
    .then((response) => {
      res.body = response.data
      next();
    })
    .catch(next);
};

const postReview = (req, res, next) => {
  const { body, name, email, product_id, rating, summary, recommend, photos, characteristics } = req.body;

  const data = JSON.stringify({
    product_id,
    rating,
    summary,
    body,
    recommend,
    name,
    email,
    photos,
    characteristics
  });

  const options = {
    method: 'post',
    url: endpoint,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data
  };

  axios(options)
    .then((res) => {
      next();
    })
    .catch(next);
};

module.exports = {
  getReviews,
  getMetaData,
  postReview,
};

