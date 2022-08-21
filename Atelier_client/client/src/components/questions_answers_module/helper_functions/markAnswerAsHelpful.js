import axios from 'axios';

export default function markAnswerAsHelpful(answer_id) {
  // console.log(productId, page);

  const url = `helpful/question/${answer_id}`;

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
