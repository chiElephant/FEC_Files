import axios from 'axios';

export default function markQuestionAsHelpful(question_id) {
  const url = `helpful/question/${question_id}`;

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
