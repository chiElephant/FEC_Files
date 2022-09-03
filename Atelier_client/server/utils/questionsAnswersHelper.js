require('dotenv').config();
const axios = require('axios');
const { uploadToCloudinary } = require('./uploadToCloudinary');

const { URL, TOKEN } = process.env;

// only have to take care of one request here
// client will be in charge of sending mutiple requests

const getQuestions = (req, res, next) => {
  const { product_id, page, count } = req.params;

  const url = `${URL}/qa/questions?product_id=${product_id}&page=${page}&count=${count}`;

  const options = {
    headers: { Authorization: TOKEN },
  };

  axios
    .get(url, options)
    .then((response) => {
      res.body = response.data;
      next();
    })
    .catch(next);
};

const getAnswers = (req, res, next) => {
  const { question_id, page, count } = req.params;

  const url = `${URL}/qa/questions/${question_id}/answers?page=${page}&count=${count}`;

  const options = {
    headers: { Authorization: TOKEN },
  };

  axios
    .get(url, options)
    .then((response) => {
      res.body = response.data;

      next();
    })
    .catch(next);
};

const addQuestion = (req, res, next) => {
  const url = `${URL}/qa/questions`;

  const { body, name, email, product_id } = req.body;

  console.log(req.body);

  const data = JSON.stringify({
    body,
    name,
    email,
    product_id,
  });

  const options = {
    method: 'post',
    url,
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/json',
    },
    data,
  };

  axios(options)
    .then(() => {
      next();
    })
    .catch(next);
};

const addAnswer = (req, res, next) => {
  const { question_id } = req.params;
  const { body, name, email, photoUrls } = req.body;

  const url = `${URL}/qa/questions/${question_id}/answers`;

  const data = JSON.stringify({
    body,
    name,
    email,
    photos: photoUrls,
  });

  console.log(data);

  const options = {
    method: 'post',
    url,
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/json',
    },
    data,
  };

  axios(options)
    .then(() => {
      next();
    })
    .catch(next);
};

const markQuestionAsHelpful = (req, res, next) => {
  const { question_id } = req.params;

  const url = `${URL}/qa/questions/${question_id}/helpful`;

  console.log(question_id, url);

  const options = {
    method: 'put',
    url,
    headers: {
      Authorization: TOKEN,
    },
  };

  axios(options)
    .then(() => {
      next();
    })
    .catch(next);
};

const markAnswerAsHelpful = (req, res, next) => {
  const { answer_id } = req.params;

  const url = `${URL}/qa/answers/${answer_id}/helpful`;

  const options = {
    method: 'put',
    url,
    headers: {
      Authorization: TOKEN,
    },
  };

  axios(options)
    .then(() => {
      next();
    })
    .catch(next);
};

const reportAnswer = (req, res, next) => {
  const { answer_id } = req.params;

  const url = `${URL}/qa/answers/${answer_id}/report`;

  const options = {
    method: 'put',
    url,
    headers: {
      Authorization: TOKEN,
    },
  };

  axios(options)
    .then(() => {
      next();
    })
    .catch(next);
};

module.exports = {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
  markQuestionAsHelpful,
  markAnswerAsHelpful,
  reportAnswer,
};
