import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

function StarRating({ rating, handleUserInputs }) {
  const [starDiv, setStarDiv] = useState([<div key="init" />]);

  useEffect(() => {
    createStarDiv();
  }, [rating]);

  const starKey = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Great',
  };

  const keyText = starKey[rating];

  function createStarDiv() {
    let div = [];

    const NUM_STARS = 5;

    for (let i = 1; i <= NUM_STARS; i++) {
      div.push(
        <FontAwesomeIcon
          key={`${i}`}
          id={`star-${i}`}
          className="review-modal-stars"
          icon={rating >= i ? solid('star') : regular('star')}
          onClick={() => {
            handleUserInputs('rating', i);
          }}
        />
      );
    }
    setStarDiv((prevState) => div);
  }

  return (
    <fieldset id="rate-by-star">
      <legend>Overall Rating*</legend>
      {starDiv}
      {keyText}
    </fieldset>
  );
}

export default StarRating;
