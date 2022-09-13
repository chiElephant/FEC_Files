import React, { useState, useEffect, useRef } from 'react';

import { initialState, helpers, reviewForm } from './helper_functions/submitReview';
import Characteristics from './Characteristics.jsx';
import ErrorModal from './ErrorModal.jsx';
import StarRating from './StarRating.jsx';
import Photos from './Photos.jsx';

function SubmitReview({
  showReviewModal,
  setShowReviewModal,
  product_name,
  product_id,
  characteristics,
}) {
  const [userInputs, setUserInputs] = useState(initialState.reviewForm);
  const [errorModal, setErrorModal] = useState('');

  const error = useRef('');

  useEffect(() => {
    const newValue = { product_id: product_id };
    setUserInputs((prevInput) => ({
      ...prevInput,
      ...newValue,
    }));
  }, [product_id]);

  function handleUserInputs(input, value, option) {
    let newValue;

    if (option) {
      newValue = { [value]: option };

      setUserInputs((prevInput) => ({
        ...prevInput,
        [input]: {
          ...prevInput[input],
          ...newValue,
        },
      }));
    } else {
      newValue = { [input]: value };

      setUserInputs((prevInput) => ({
        ...prevInput,
        ...newValue,
      }));
    }
  }

  return !showReviewModal ? (
    ''
  ) : (
    <div id="review-window">
      <div id="review-form" onSubmit={(e) => e.preventDefault()}>
        <div onClick={() => setShowReviewModal((showReviewModal) => false)}>
          <i
            className="fak fa-square-xmark-light fa-2xl"
            id="review-window-icon"
          ></i>
        </div>

        <h1>Write Your Review</h1>
        <h3>About the {product_name}</h3>

        {/* This will allow the user to rate the product */}
        <StarRating
          rating={userInputs.rating}
          handleUserInputs={handleUserInputs}
        />

        {/* This will allow the user if they recommend the product*/}
        <fieldset id="recommend" required="required">
          <legend>Do you recommend this product?*</legend>
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

        {/* This will allow the user to rate the product characteristics */ }
        <Characteristics
          characteristics={characteristics}
          handleUserInputs={handleUserInputs}
        />

        {/* This will alllow the user to enter a summary */}
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

        {/* This will allow a user to enter a review body */}
        <fieldset id="review-body-input">
          <legend>Review*</legend>
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
            {userInputs.body.length < 50
              ? `Minimum required characters left: ${
                  50 - userInputs.body.length
                }`
              : 'Minimum Reached'}
          </span>
        </fieldset>

        {/* This will allow the user to upload photos */}
        <Photos
          photos={userInputs.photos}
          handleUserInputs={handleUserInputs}
        />

        {/* This will allow the user to enter their enter their name */}
        <fieldset id="name-input">
          <legend>What is your Name?*</legend>
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

        {/* This will allow the user to enter their email */}
        <fieldset id="email-input">
          <legend>Your email*</legend>
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
          onClick={() =>
            helpers.validateUserData(
              userInputs,
              setUserInputs,
              characteristics,
              setShowReviewModal
            )
          }
        >
          Submit Review
        </button>
        <span>*required</span>
      </div>
      <ErrorModal
        error={error}
        errorModal={errorModal}
        setErrorModal={setErrorModal}
      />
    </div>
  );
}

export default SubmitReview;
