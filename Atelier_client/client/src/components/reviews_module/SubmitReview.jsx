import React, { useState } from 'react';

function SubmitReview ( {showReviewModal, closeReviewModal} ) {

  const[stars, setStars] = useState()
  const[recommend, setRecommend] = useState('')

  const handleChange = (event) => {
    let e = event;
    console.lot(e);
  }

  const handleSubmit = () => {
    closeReviewModal();
  }

  const handleRecommend = (value) => {
    setRecommend(value);
  }

  return (!showReviewModal) ? "" : (
    <div id="review-window">
      <div id ="review-form">
        <h1>Write Your Review</h1>
        <h3>About the {'productName'}</h3>

        {/* This div will ask the customer if they recommend the product*/}
        <div id='recommend'>
          <fieldset>
            <legend>Do you recommend this product?</legend>
            <div>
              <label>
                <input type='radio' id='rec' value='yes' onClick={() => handleRecommend('true')}
                /> Yes
              </label>
            </div>
            <div>
              <label>
                <input type='radio' id='rec' value='no' onClick={() => handleRecommend('false')}
                /> No
              </label>
            </div>
          </fieldset>
        </div>

      </div>
      <input type='submit' onClick={() => handleSubmit()}></input>
    </div>
  )
}

export default SubmitReview;