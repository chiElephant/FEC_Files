import axios from 'axios';

export default function markAnswerAsHelpful(answer_id) {
  const url = `helpful/answer/${answer_id}`;

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
