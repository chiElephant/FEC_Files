import React, { useState, useEffect } from 'react';
import addAnswer from './helper_functions/addAnswer';
import FormInput from './FormInput.jsx';
import FormErrorList from './FormErrorList.jsx';
import convertToBase64url from './helper_functions/convertToBase64url';

function ModalAnswer({ productName, productId, showModal, questionBody }) {
  const [values, setValues] = useState({
    answer: '',
    nickname: '',
    email: '',
    photos: [],
  });
  const [validEntries, setValidEntries] = useState({
    answer: false,
    nickname: false,
    email: false,
    photos: true,
  });
  const [formError, setFormError] = useState(false);

  const inputs = [
    {
      id: 1,
      label: 'Your Answer',
      name: 'answer',
      type: null,
      maxLength: '1000',
      placeholder: null,
      message: null,
      errorMessage: 'please enter an answer',
      pattern: null,
      required: true,
    },
    {
      id: 2,
      label: 'What is your nickname',
      name: 'nickname',
      type: 'text',
      maxLength: '60',
      placeholder: 'Example: jack543!',
      message:
        'For privacy reasons, do not use your full name or email address',
      errorMessage: 'please enter a nickname',
      pattern: null,
      required: true,
    },
    {
      id: 3,
      label: 'Your email',
      name: 'email',
      type: 'email',
      maxLength: '60',
      placeholder: 'Example: jack@email.com',
      message: 'For authentication reasons, you will not be emailed',
      errorMessage: 'please enter a valid email address',
      required: true,
    },
    {
      id: 4,
      label: 'Upload your photos',
      name: 'photos',
      type: 'file',
      accept: 'image/*',
      errorMessage: 'must upload a valid image',
      maxUploads: 5,
    },
  ];

  const handleUpload = (e) => {
    convertToBase64url(e)
      .then((res) => {
        console.log(res);
        const copyArray = values.photos.slice();

        res.forEach((item) => {
          if (item === undefined) {
            throw Error('invalid files selected');
          }
          if (values.photos.indexOf(item) === -1 && values.photos.length < 5) {
            copyArray.push(item);
          }
        });

        const newObj = { ...values, photos: copyArray };
        setValues(newObj);
        setValidEntries({ ...validEntries, photos: true });
      })
      .catch((error) => {
        setValidEntries({ ...validEntries, photos: false });
        console.log('error: ', error);
      });
  };

  const validateForm = () => {
    const error = Object.values(validEntries).every((item) => !item);
    if (error) {
      setFormError(error);
    } else {
      setFormError(!error);
    }
  };

  const handleSubmit = () => {
    const { question, nickname, email, photos } = values;
    addAnswer(productId, question, nickname, email, photos);
    showModal();
  };

  const onChange = (e) => {
    const isValueValid = e.target.validity.valid;
    const targetName = e.target.name;
    const targetValue = e.target.value;

    if (isValueValid) {
      setValidEntries({
        ...validEntries,
        [targetName]: true,
      });
    } else {
      setValidEntries({
        ...validEntries,
        [targetName]: false,
      });
    }

    if (targetName === 'photos') {
      handleUpload(e);
    } else {
      setValues({
        ...values,
        [targetName]: targetValue,
      });
    }
  };

  let displayError;
  if (formError === true) {
    displayError = (
      <FormErrorList validEntries={validEntries} inputs={inputs} />
    );
  } else {
    displayError = null;
  }

  console.log('values:', values);
  return (
    <div id="new-question-window">
      <form id="question-form" onSubmit={handleSubmit}>
        <h1>Submit Your Answer</h1>
        <h2>
          {productName}: {questionBody}
        </h2>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        {displayError}
        <button id="submit-question-button" onClick={validateForm}>
          Submit Answer
        </button>
      </form>
    </div>
  );
}

export default ModalAnswer;
