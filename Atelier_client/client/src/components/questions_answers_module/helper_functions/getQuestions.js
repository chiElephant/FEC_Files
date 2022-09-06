import axios from 'axios';

export default function getQuestions(
  productId,
  page,
  count,
  setQuestionList,
  setPage,
  displayList,
  setDisplayList,
  setShowMoreQuestions
) {
  const url = `/questions/${productId}/${page}/${count}`;

  axios
    .get(url)
    .then((response) => {
      console.log('axios get questions');
      const questionList = response.data.results;
      // const questionList = [];
      setQuestionList((prevstate) => prevstate.concat(response.data.results));

      if (questionList.length > 0 && displayList.length === 0) {
        const grabFirstTwo = questionList.slice(0, 2);
        setDisplayList(grabFirstTwo);
        setShowMoreQuestions(true);
      }

      if (questionList.length > 0) {
        setPage((prevstate) => prevstate + 1);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

//possible future refactor for performance optimization
//loop through axios requests to grab all questions
//use promise all
//then set all questions and first two questions to display in display
