import axios from 'axios';

export default function getAnswers(questionId, setAnswerList, setDisplayList) {
  const url = `/answers/${questionId}`;

  axios
    .get(url)
    .then((response) => {
      setAnswerList(response.data);
      setDisplayList(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
