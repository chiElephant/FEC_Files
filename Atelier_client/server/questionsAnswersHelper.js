require('dotenv').config();
const axios = require('axios');

const { URL, TOKEN } = process.env;

// only have to take care of one request here
// client will be in charge of sending mutiple requests

const getQuestions = (req, res, next) => {
  const { product_id, page, count } = req.params;

  console.log(product_id, page, count);

  const url = `${URL}/qa/questions?product_id=${product_id}&page=${page}&count=${count}`;

  console.log(url);

  const options = {
    headers: { Authorization: TOKEN },
  };

  axios
    .get(url, options)
    .then((response) => {
      res.body = response.data;
      console.log(response.data);
      next();
    })
    .catch(next);
};

const getAnswers = (req, res, next) => {
  const { question_id, page, count } = req.params;

  console.log(question_id, page, count);

  const url = `${URL}/qa/questions/${question_id}/answers?page=${page}&count=${count}`;

  console.log(url);

  const options = {
    headers: { Authorization: TOKEN },
  };

  axios
    .get(url, options)
    .then((response) => {
      res.body = response.data;
      console.log(response.data);
      next();
    })
    .catch(next);
};

module.exports = {
  getQuestions,
  getAnswers,
};
