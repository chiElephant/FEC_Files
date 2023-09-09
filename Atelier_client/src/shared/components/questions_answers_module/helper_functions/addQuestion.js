import axios from 'axios';

export default async function addQuestion(
  product_id,
  body,
  name,
  email,
  handleFetchQuestions
) {
  try {
    await axios.post(
      '/question',
      {
        product_id,
        body,
        name,
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    handleFetchQuestions();
  } catch (error) {
    console.log(error);
  }
}
