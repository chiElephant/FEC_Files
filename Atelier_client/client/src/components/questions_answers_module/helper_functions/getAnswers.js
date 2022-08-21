import axios from 'axios';

export default function getAnswers(questionId, page, setQlist) {
  // console.log(questionId, page);

  const url = `/answers/${questionId}/${page}/100`;

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
