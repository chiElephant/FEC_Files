import axios from 'axios';

export default function getAnswers(questionId, page, count, setQlist) {
  // console.log(questionId, page);

  const url = `/answers/${questionId}/${page}/${count}`;

  // console.log(url);

  axios
    .get(url)
    .then((response) => {
      setQlist(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
}
