import axios from 'axios';

export default function reportAnswer(answer_id) {
  const url = `answer/${answer_id}/report`;

  const options = {
    method: 'put',
    url,
  };

  axios(options)
    .then((response) => {
      console.log(response.status);
    })
    .catch((error) => {
      console.log(error);
    });
}
