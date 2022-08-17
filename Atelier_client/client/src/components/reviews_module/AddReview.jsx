import React, { useState } from 'react';

function AddReview ( {addReview, closeReview} ) {

  var productName = 'Bright Future Sunglasses'

  const[stars, setStars] = useState()
  const[recommend, setRecommend] = useState('')

  function handleChange(event) {
    let e = event;
    console.lot(e);
  }

  function handleSubmit() {
    closeReview();
  }

  function handleRecommend (value) {
    setRecommend(value);
  }

  return (!addReview) ? "" : (
    <div id="review-window">
      <div id ="review-form">
        <h1>Write Your Review</h1>
        <h3>About the {productName}</h3>

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

        <span key={1} className= "fa fa-star empty-star star-modal" id='star-icon1'  onClick = {()=> {
            }}>
        </span>

      </div>
      <input type='submit' onClick={() => handleSubmit()}></input>
    </div>
  )
}

export default AddReview;