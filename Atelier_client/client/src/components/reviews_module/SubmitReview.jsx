import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used

function SubmitReview({
  showReviewModal,
  setShowReviewModal,
  submitReview,
  productName,
}) {
  const [stars, setStars] = useState();
  const [recommend, setRecommend] = useState('');

  const handleChange = (event) => {
    let e = event;
    console.lot(e);
  };

  const handleSubmit = () => {
    submitReview(setShowReviewModal);
  };

  const handleRecommend = (value) => {
    setRecommend(value);
  };

  return !showReviewModal ? (
    ''
  ) : (
    <div id="review-window">
      <div id="review-form">
        <h1>Write Your Review</h1>
        <h3>About the {productName}</h3>

        {/* This div will ask the customer to fill in a star rating */}
        <div id="rate-by-star">
          <fieldset>
            <legend>Overall Rating</legend>
            <FontAwesomeIcon icon={solid('star')} id="star-1" />
            <FontAwesomeIcon icon={solid('star')} id="star-2" />
            <FontAwesomeIcon icon={solid('star')} id="star-3" />
            <FontAwesomeIcon icon={solid('star')} id="star-4" />
            <FontAwesomeIcon icon={regular('star')} id="star-5" />
          </fieldset>
        </div>

        {/* This div will ask the customer if they recommend the product*/}
        <div id="recommend">
          <fieldset>
            <legend>Do you recommend this product?</legend>
            <div>
              <label>
                <input
                  type="radio"
                  name="rec"
                  value="yes"
                  onClick={() => handleRecommend('true')}
                />{' '}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="rec"
                  value="no"
                  onClick={() => handleRecommend('false')}
                />{' '}
                No
              </label>
            </div>
          </fieldset>
        </div>
        {/* // This div asks the customer about different product characteristics */}
        <div id="characteristics-radios">
          <fieldset>
            <legend>Characteristics</legend>
            <div>
              <span> None Selected </span>
              <br />
              <label>
                {' '}
                Quality:
                <input
                  type="radio"
                  name="quality"
                  value="1"
                  onClick={() => console.log('quality 1')}
                />
                <input
                  type="radio"
                  name="quality"
                  value="2"
                  onClick={() => console.log('quality 2')}
                />
                <input
                  type="radio"
                  name="quality"
                  value="3"
                  onClick={() => console.log('quality 3')}
                />
                <input
                  type="radio"
                  name="quality"
                  value="4"
                  onClick={() => console.log('quality 4')}
                />
                <input
                  type="radio"
                  name="quality"
                  value="5"
                  onClick={() => console.log('quality 5')}
                />
              </label>
            </div>
            <span> lowest(1) highest(5) </span>
          </fieldset>
        </div>

        {/* This div will alllow the user to enter a summary */}
        <div id="review-summary-input">
          <fieldset>
            <legend>Summary</legend>
            <div>
              <textarea
                maxLength="60"
                placeholder={'Example: Best purchse ever!'}
                rows="3"
                cols="35"
              ></textarea>
            </div>
          </fieldset>
        </div>

        {/* This div will allow a user to enter a review body */}

        <div id="review-body-input">
          <fieldset>
            <legend>Review</legend>
            <div>
              <textarea
                minLength="50"
                maxLength="1000"
                placeholder={'Why did you like this product or not?'}
                rows="5"
                cols="70"
                required="required"
                wrap="hard"
              ></textarea>
            </div>
            <br />
            <span>Minimum required characters left: 50</span>
          </fieldset>
        </div>

        {/* This div will allow the user to upload photos to the review */}

        <div id="photo-input">
          <fieldset>
            <legend>Review</legend>
            <input type="file" className="photo-input" accept='image/png, image/jpeg' multiple></input>
          </fieldset>
          <br />
          <input type="submit" onClick={() => handleSubmit()}></input>
        </div>
      </div>
    </div>
  );
}

export default SubmitReview;
