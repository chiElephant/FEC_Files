import axios from 'axios';

export default function getAnswers(
  questionId,
  page,
  count,
  setAnswerList,
  setPage,
  displayList,
  setDisplayList,
  setShowMoreAnswers
) {
  // console.log(questionId, page);

  const url = `/answers/${questionId}/${page}/${count}`;

  // console.log(url);

  axios
    .get(url)
    .then((response) => {
      const questionList = response.data.results;
      // const questionList = [];
      setAnswerList((prevstate) => prevstate.concat(response.data.results));

      if (questionList.length > 2 && displayList.length === 0) {
        const grabFirstTwo = questionList.slice(0, 2);
        setDisplayList(grabFirstTwo);
        setShowMoreAnswers(true);
      }

      if (questionList.length > 0) {
        setPage((prevstate) => prevstate + 1);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
