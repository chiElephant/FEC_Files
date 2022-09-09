import axios from 'axios';

export default function addAnswer(
  question_id,
  body,
  name,
  email,
  photos,
  handleFetchAnswers
) {
  const url = `answer/${question_id}`;
  const data = JSON.stringify({
    body,
    name,
    email,
    photos,
  });

  console.log(data);
  const options = {
    method: 'post',
    url,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios(options)
    .then((response) => {
      console.log(response.status);
      handleFetchAnswers();
    })
    .catch((error) => {
      console.log(error);
    });
}
