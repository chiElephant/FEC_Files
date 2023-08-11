require('dotenv').config();
const axios = require('axios');

const { URL, TOKEN } = process.env;

const filteredAnswers = (object) =>
  object.map((obj) => {
    const answers = Object.values(obj.answers);

    const filterBySeller = answers.filter(
      (item) => item.answerer_name === 'Seller'
    );

    const filterRestAndSortByHelpfulness = answers
      .filter((item) => item.answerer_name !== 'Seller')
      .sort((a, b) => b.date - a.date)
      .sort((a, b) => b.helpfulness - a.helpfulness);

    obj.answers = [...filterBySeller, ...filterRestAndSortByHelpfulness];

    return obj;
  });

const filteredAnswersFromGet = (inputArray) => {
  const filterBySeller = inputArray.filter(
    (item) => item.answerer_name === 'Seller'
  );

  const filterRestAndSortByHelpfulness = inputArray
    .filter((item) => item.answerer_name !== 'Seller')
    .sort((a, b) => b.date - a.date)
    .sort((a, b) => b.helpfulness - a.helpfulness);

  return [...filterBySeller, ...filterRestAndSortByHelpfulness];
};

const getQuestions = async (productId) => {
  let store = [];
  const count = 100;

  async function get(page) {
    const url = `${URL}/qa/questions?product_id=${productId}&page=${page}&count=${count}`;

    const options = {
      headers: { Authorization: TOKEN },
    };

    const response = await axios.get(url, options);
    const questionList = response.data.results;

    if (questionList.length > 0) {
      store = [...store, ...questionList];
      await get(page + 1);
    }
    return filteredAnswers(store);
  }

  await get(1);
  return store;
};

const getAnswers = (req, res, next) => {
  const { question_id } = req.params;
  let store = [];
  const count = 100;

  function get(page) {
    const url = `${URL}/qa/questions/${question_id}/answers?page=${page}&count=${count}`;

    const options = {
      headers: { Authorization: TOKEN },
    };
    axios
      .get(url, options)
      .then((response) => {
        const answerlist = response.data.results;

        if (answerlist.length > 0) {
          store = [...store, ...answerlist];
          get(page + 1);
        } else {
          res.body = filteredAnswersFromGet(store);
          next();
        }
      })
      .catch(next);
  }

  get(1);
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
    photos: photoUrls || [],
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
