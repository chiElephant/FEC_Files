import axios from 'axios';

export default function getQuestions(productId, page, setQlist) {
  // console.log(productId, page);

  const url = `/questions/${productId}/${page}/100`;

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
