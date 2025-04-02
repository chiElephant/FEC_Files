import axios from 'axios';

const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

export default async function getQuestions(API_KEY, productId) {
  let store = [];
  const count = 100;

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

  const removeDuplicatesByProperty = (arr, prop) => {
    const seen = new Set();
    return arr.filter((obj) => {
      if (seen.has(obj[prop])) {
        return false;
      }
      seen.add(obj[prop]);
      return true;
    });
  };

  async function get(page) {
    const url = `${URL}/qa/questions?product_id=${productId}&page=${page}&count=${count}`;

    const options = {
      headers: { Authorization: API_KEY },
    };

    const response = await axios.get(url, options);
    const questionList = response.data.results;

    if (questionList.length > 0) {
      store = [...store, ...questionList];
      await get(page + 1);
    }
    return store;
  }

  await get(1);
  const removedDuplicatesData = removeDuplicatesByProperty(
    store,
    'question_id'
  );
  return filteredAnswers(removedDuplicatesData);
}
