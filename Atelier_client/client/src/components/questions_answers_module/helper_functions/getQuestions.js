import axios from 'axios';

export default function getQuestions(
  productId,
  page,
  count,
  setQlist,
  setPage,
  displayList,
  setDisplayList,
  questionListLength,
  setShowMoreQuestions
) {
  const url = `/questions/${productId}/${page}/${count}`;

  axios
    .get(url)
    .then((response) => {
      const questionList = response.data.results;
      // const questionList = [];
      setQlist((prevstate) => prevstate.concat(response.data.results));

      if (questionList.length > 2 && displayList.length === 0) {
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
