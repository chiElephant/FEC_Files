require('dotenv').config();
const axios = require('axios');


const endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/`;
const metaEndpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/`;
const token = process.env.TOKEN;

const getReviews = (query, sendToClient) => {
  const options = {
    headers: { Authorization: token },
    params: query,
  };

  axios
    .get(endpoint, options)
    .then((response) => {
      sendToClient(response.data.results);
    })
    .catch((error) => {
      sendToClient('Error fetching from API: ', error);
    });
};

const getMetaData = (query, sendToClient) => {
  const options = {
    headers: { Authorization: token },
    params: query,
  };

  axios
    .get(metaEndpoint, options)
    .then((res) => {
      sendToClient(res.data);
    })
    .catch((error) => {
      sendToClient('Error fetching from API: ', error);
    });
};

const postReview = (req, sendToClient) => {
  const { body, name, email, product_id, rating, summary, recommend, photos, characteristics } = req.body;

  const data = {
    product_id,
    rating,
    summary,
    body,
    recommend,
    name,
    email,
    photos,
    characteristics
  };

  const options = {
    method: 'post',
    url: endpoint,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data,
  };

  axios(options)
    .then((res) => {
      sendToClient(res);
    })
    .catch(err => {console.log("POST error: ", err)});
};

module.exports = {
  getReviews,
  getMetaData,
  postReview,
};
