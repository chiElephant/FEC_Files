import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Characteristics from './Characteristics.jsx';
import StarRating from './StarRating.jsx';
import Photos from './Photos.jsx';

function SubmitReview({
  showReviewModal,
  setShowReviewModal,
  submitReviewForm,
  productName,
  product_id,
  chars,
}) {

  const [recommend, setRecommend] = useState('boolean');
  const [productChars, setProductChars] = useState({});
  const [summary, setSummary] = useState('');
  const [photos, setPhotos] = useState([]);
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState('');


  const handleChange = (cb, value) => {
    cb(`${value}`);
  };

  const handleClick = (cb, value) => {
    cb(value);
  };

  const validateUserData = () => {
    const productCharsLength = Object.keys(productChars).length
    const charsLength = Object.keys(chars).length
    console.log(Object.keys(productChars), Object.keys(chars) )
    if (rating > 0 && typeof recommend === 'boolean' && productCharsLength === charsLength) {
      handleSubmit()
    } else {
      throw new Error('You must enter the fallowing')
    }
  }

  const handleSubmit = () => {

    setShowReviewModal(false);
    setRating(0);
    console.log('In Submit')

    // axios
    //   .post('/reviews', {
    //     product_id,
    //     rating,
    //     summary,
    //     body,
    //     recommend,
    //     name,
    //     email,
    //     photos,
    //     characteristics: productChars,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log('post error: ', error);
    //   });
  };

  return !showReviewModal ?
    ('') :

    (
      <div id="review-window">
        <form id="review-form" onSubmit={e => e.preventDefault()}>

          <h1>Write Your Review</h1>
          <h3>About the {productName}</h3>

          <StarRating
            rating={rating}
            setRating={setRating} />


          {/* This div will ask the customer if they recommend the product*/}
          <fieldset id="recommend" required="required">
            <legend>Do you recommend this product?</legend>
            <label>
              <input
                type="radio"
                name="rec"
                value="yes"
                onClick={() => handleClick(setRecommend, true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="rec"
                value="no"
                onClick={() => handleClick(setRecommend, false)}
              />
              No
            </label>
          </fieldset>

          <Characteristics
            characteristics={chars}
            setProductChars={setProductChars} />

          {/* This div will alllow the user to enter a summary */}
          <fieldset id="review-summary-input">
            <legend>Summary</legend>
            <textarea
              maxLength="60"
              placeholder={'Example: Best purchse ever!'}
              rows="2"
              cols="35"
              required="required"
              onChange={(e) => handleChange(setSummary, e.target.value)}>
            </textarea>
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
              onChange={(e) => handleChange(setBody, e.target.value)}
            ></textarea>

            <span>
              {body.length < 50
                ? `Minimum required characters left: ${50 - body.length}`
                : 'Minimum Reached'}
            </span>
          </fieldset>

          <Photos
            photos={photos}
            setPhotos={setPhotos} />

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
              onChange={(e) => handleChange(setName, e.target.value)}
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
              onChange={(e) => handleChange(setEmail, e.target.value)}
            ></input>
            <br />
            <span>For authentication reasons, you will not be emailed</span>
          </fieldset>
          <br />
          <button type="submit" onClick={() => validateUserData()}>Submit Review</button>
        </form>
      </div>
    );
}

export default SubmitReview;
