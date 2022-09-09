import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Characteristics from './Characteristics.jsx';
import StarRating from './StarRating.jsx';
import Photos from './Photos.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function SubmitReview({
  showReviewModal,
  setShowReviewModal,
  submitReviewForm,
  productName,
  product_id,
  chars,
}) {

  const [userInputs, setUserInputs] = useState({
    product_id: 0,
    recommend: null,
    characteristics: {},
    summary: '',
    photos: [],
    rating: 0,
    email: '',
    body: '',
    name: '',
  });

  useEffect(() => {
    setUserInputs(prevInput => ({
      ...prevInput,
      [product_id]: product_id
    }))
  }, [product_id])

  function handleUserInputs ( input, value, option ) {
    let newValue;

    if (option) {
      newValue = {[value]: option};

      setUserInputs( prevInput => ({
        ...prevInput,
        [input]: {
          ...prevInput[input],
          ...newValue
        }
      }))

    } else {
      newValue = {[input]: value};

      setUserInputs( prevInput => ({
        ...prevInput,
        ...newValue
      }))
    }
  }

  const validateUserData = () => {
    const productCharsLength = Object.keys(userInputs.characteristics).length;
    const charsLength = Object.keys(chars).length;
    console.log(userInputs);
    if (
      userInputs.rating > 0 &&
      typeof recommend === 'boolean' &&
      productCharsLength === charsLength
    ) {
      handleSubmit();
    } else {
      // throw new Error('You must enter the fallowing');
      setShowReviewModal((showReviewModal) => false);
    }
  };

  const handleSubmit = () => {
    setShowReviewModal((showReviewModal) => false);
    setRating(0);

    axios
      .post('/reviews', userInputs)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('post error: ', error);
      });
  };

  return !showReviewModal ? (
    ''
  ) : (
    <div id="review-window">
      <div id="review-form" onSubmit={(e) => e.preventDefault()}>
        <FontAwesomeIcon
          id="review-window-icon"
          icon={solid('square-xmark')}
          size="2x"
          onClick={() => setShowReviewModal(showReviewModal => false)}
        />
        <h1>Write Your Review</h1>
        <h3>About the {productName}</h3>

        <StarRating rating={userInputs.rating} handleUserInputs={handleUserInputs} />

        {/* This div will ask the customer if they recommend the product*/}
        <fieldset id="recommend" required="required">
          <legend>Do you recommend this product?</legend>
          <label className="rec-radio-text">
            <input
              type="radio"
              name="rec"
              value="yes"
              className="rec-radio"
              onClick={() => handleUserInputs('recommend', true)}
            />
            Yes
          </label>
          <label className="rec-radio-text">
            <input
              type="radio"
              name="rec"
              value="no"
              className="rec-radio"
              onClick={() => handleUserInputs('recommend', false)}
            />
            No
          </label>
        </fieldset>

        <Characteristics
          characteristics={chars}
          handleUserInputs={handleUserInputs}
        />

        {/* This div will alllow the user to enter a summary */}
        <fieldset id="review-summary-input">
          <legend>Summary</legend>
          <textarea
            maxLength="60"
            placeholder={'Example: Best purchse ever!'}
            rows="2"
            cols="35"
            required="required"
            onChange={(e) => handleUserInputs('summary', e.target.value)}
          ></textarea>
        </fieldset>

        {/* This div will allow a user to enter a review body */}
        <fieldset id="review-body-input">
          <legend>Review</legend>
          <textarea
            minLength="50"
            maxLength="1000"
            placeholder={'Why did you like this product or not?'}
            rows="3"
            cols="70"
            wrap="hard"
            required="required"
            onChange={(e) => handleUserInputs('body', e.target.value)}
          ></textarea>

          <span>
            {body.length < 50
              ? `Minimum required characters left: ${50 - body.length}`
              : 'Minimum Reached'}
          </span>
        </fieldset>

        <Photos photos={photos} handleUserInputs={handleUserInputs} />

        {/* This div will ask the user to enter their enter their name */}
        <fieldset id="name-input">
          <legend>What is your Name?</legend>
          <input
            type="text"
            className="name-input"
            placeholder="Example: jackson11!"
            maxLength="60"
            size="35"
            required="required"
            onChange={(e) => handleUserInputs('name', e.target.value)}
          ></input>
          <br />
          <span>
            For privacy reasons, do not use your full name or email address
          </span>
        </fieldset>

        {/* This div will ask the user to enter their email */}
        <fieldset id="email-input">
          <legend>Your email</legend>
          <input
            type="email"
            className="email-input"
            placeholder="Example: jackson11@email.com"
            maxLength="60"
            size="35"
            required="required"
            onChange={(e) => handleUserInputs('email', e.target.value)}
          ></input>
          <br />
          <span>For authentication reasons, you will not be emailed</span>
        </fieldset>
        <br />
        <button
          id="submit-review"
          type="submit"
          className="reviews-btn"
          onClick={() => validateUserData()}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default SubmitReview;
