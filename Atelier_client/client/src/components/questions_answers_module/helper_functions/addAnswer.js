import axios from 'axios';

export default function addAnswer(
  question_id,
  product_id,
  body,
  name,
  email,
  photos
) {
  const url = `answer/${question_id}`;

  const data = JSON.stringify({
    product_id,
    body,
    name,
    email,
    photos,
    headers: {
      'Content-Type': 'application/json',
    },
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
