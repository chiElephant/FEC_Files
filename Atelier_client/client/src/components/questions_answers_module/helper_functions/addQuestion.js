import axios from 'axios';

export default function addQuestion(product_id, body, name, email) {
  const url = `/question`;

  const data = JSON.stringify({
    product_id,
    body,
    name,
    email,
  });

  const options = {
    method: 'post',
    url,
    data,
  };

  axios(options)
    .then((response) => {
      console.log(response.status);
    })
    .catch((error) => {
      console.log(error);
    });
}
