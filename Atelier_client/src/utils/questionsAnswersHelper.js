/* eslint-disable no-param-reassign */
require('dotenv').config();
const axios = require('axios');

const { URL, GIT } = process.env;

const filteredAnswers = (inputArray) => {
  const filterBySeller = inputArray.filter(
    (item) => item.answerer_name === 'Seller'
  );

  const filterRestAndSortByHelpfulness = inputArray
    .filter((item) => item.answerer_name !== 'Seller')
    .sort((a, b) => b.date - a.date)
    .sort((a, b) => b.helpfulness - a.helpfulness);

  return [...filterBySeller, ...filterRestAndSortByHelpfulness];
};

const getAnswers = async (question_id) => {
  let store = [];
  const count = 100;

  async function get(page) {
    const url = `${URL}/qa/questions/${question_id}/answers?page=${page}&count=${count}`;
    const options = {
      headers: { Authorization: GIT },
    };

    try {
      const response = await axios.get(url, options);
      const answerlist = response.data.results;

      if (answerlist.length > 0) {
        store = [...store, ...answerlist];
        await get(page + 1);
      } else {
        return filteredAnswers(store);
      }
    } catch (error) {
      throw Error(error);
    }
  }

  await get(1);
};

const addQuestion = async ({ body, name, email, product_id }) => {
  try {
    await axios.post(
      `${URL}/qa/questions`,
      { body, name, email, product_id },
      {
        headers: {
          Authorization: GIT,
        },
      }
    );
  } catch (error) {
    next(error);
  }
};

const addAnswer = async (body, name, email, photoUrls, question_id) => {
  try {
    await axios.post(
      `${URL}/qa/questions/${question_id}/answers`,
      {
        body,
        name,
        email,
        photos: photoUrls || [],
      },
      {
        headers: {
          Authorization: GIT,
        },
      }
    );
  } catch (error) {
    next(error);
  }
};

const markQuestionAsHelpful = async (question_id) => {
  try {
    await axios.put(
      `${URL}/qa/questions/${question_id}/helpful`,
      {},
      {
        headers: {
          Authorization: GIT,
        },
      }
    );
  } catch (error) {
    next(error);
  }
};

const markAnswerAsHelpful = async (answer_id) => {
  try {
    await axios.put(
      `${URL}/qa/answers/${answer_id}/helpful`,
      {},
      {
        headers: {
          Authorization: GIT,
        },
      }
    );
  } catch (error) {
    next(error);
  }
};

const reportAnswer = async (answer_id) => {
  try {
    await axios.put(
      `${URL}/qa/answers/${answer_id}/report`,
      {},
      {
        headers: {
          Authorization: GIT,
        },
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnswers,
  addQuestion,
  addAnswer,
  markQuestionAsHelpful,
  markAnswerAsHelpful,
  reportAnswer,
};
