import axios from 'axios';

export default function getQuestions(productId, page, count, setQlist) {
  // console.log(productId, page);

  const url = `/questions/${productId}/${page}/${count}`;

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
