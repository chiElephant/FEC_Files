import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Characteristics from './form_inputs/Characteristics.jsx'
import StarRating from './form_inputs/StarRating.jsx'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

function SubmitReview({
  showReviewModal,
  setShowReviewModal,
  submitReviewForm,
  productName,
  product_id,
  characteristics,
}) {

  const [productChars, setProductChars] = useState({});
  const [addPhotoDiv, setAddPhotoDiv] = useState(<div />);
  const [recommend, setRecommend] = useState('boolean');
  const [summary, setSummary] = useState('');
  const [rating, setRating] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState('');


  // Handles all onChange events
  const handleChange = (cb, value) => {
    cb(`${value}`);
  };

  const validateUserData = () => {
    if (rating > 0 && typeof recommend === 'boolean' && Object.keys(productChars).length > 0) {
      handleSubmit()
    }
  }

  // Handles submitting all user inputs from the add review from
  const handleSubmit = (event) => {
    console.log('clicked')
    console.log(event)
    setShowReviewModal(false);
    axios
      .post('/reviews', {
        product_id,
        rating,
        summary,
        body,
        recommend,
        name,
        email,
        photos,
        characteristics: productChars,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('post error: ', error);
      });
  };

  // Handles all user clicks in the add review form
  const handleClick = (cb, value) => {
    cb(value);
  };

  // Handles user uploaded photos in the add review form
  const handlePhotos = () => {
    let files = document.querySelector('#photo-input').files;
    let fileURLs = photos;

    if (files.length <= 5) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const img = document.createElement('img');
        img.file = file;
        img.width = 80;

        images.appendChild(img);

        const reader = new FileReader();
        reader.onload = (e) => {
          img.src = e.target.result;
          fileURLs.push(e.target.result);
          setPhotos(fileURLs);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return !showReviewModal ? (
    ''
  ) : (
    <div id="review-window">
      <form id="review-form" onSubmit={handleSubmit}>

        <h1>Write Your Review</h1>
        <h3>About the {productName}</h3>

        <StarRating
          rating={rating}
          setRating={setRating}/>

        {/* This div will ask the customer to fill in a star rating */}
        {/* <fieldset id="rate-by-star" >
          <legend>Overall Rating</legend>

          {rating >= 1 ? (
            <FontAwesomeIcon
              id="star-1"
              icon={solid('star')}
              onClick={() => {
                handleClick(setRating, 1);
              }}
            />
          ) : (
            <FontAwesomeIcon
              id="star-1"
              icon={regular('star')}
              onClick={() => {
                handleClick(setRating, 1);
              }}
            />
          )}

          {rating >= 2 ? (
            <FontAwesomeIcon
              id="star-2"
              icon={solid('star')}
              onClick={() => {
                handleClick(setRating, 2);
              }}
            />
          ) : (
            <FontAwesomeIcon
              id="star-2"
              icon={regular('star')}
              onClick={() => {
                handleClick(setRating, 2);
              }}
            />
          )}

          {rating >= 3 ? (
            <FontAwesomeIcon
              id="star-3"
              icon={solid('star')}
              onClick={() => {
                handleClick(setRating, 3);
              }}
            />
          ) : (
            <FontAwesomeIcon
              id="star-3"
              icon={regular('star')}
              onClick={() => {
                handleClick(setRating, 3);
              }}
            />
          )}

          {rating >= 4 ? (
            <FontAwesomeIcon
              id="star-4"
              icon={solid('star')}
              onClick={() => {
                handleClick(setRating, 4);
              }}
            />
          ) : (
            <FontAwesomeIcon
              id="star-4"
              icon={regular('star')}
              onClick={() => {
                handleClick(setRating, 4);
              }}
            />
          )}

          {rating === 5 ? (
            <FontAwesomeIcon
              id="star-5"
              icon={solid('star')}
              onClick={() => {
                handleClick(setRating, 5);
              }}
            />
          ) : (
            <FontAwesomeIcon
              id="star-5"
              icon={regular('star')}
              onClick={() => {
                handleClick(setRating, 5);
              }}
            />
          )}
        </fieldset> */}

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
          characteristics={characteristics}
          setProductChars={setProductChars}/>

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

        {/* This div will allow the user to upload photos to the review */}

        <fieldset id="review-photos">
          <legend>Upload your photos</legend>
          <input
            id="photo-input"
            type="file"
            accept="image/png, image/jpeg"
            multiple
            onChange={() => handlePhotos()}
          ></input>
          <div id="images"></div>
          {addPhotoDiv}
        </fieldset>


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
