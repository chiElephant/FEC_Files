import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function StarRating({ rating, handleUserInputs }) {
  const starKey = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Great',
  };

  const keyText = starKey[rating];

  function createFormStarRating() {
    const formStarRatingDiv = [];

    const NUM_STARS = 5;

    for (let i = 1; i <= NUM_STARS; i++) {
      formStarRatingDiv.push(
        <FontAwesomeIcon
          id={`star-${i}`}
          key={`${i}`}
          className="review-modal-stars"
          icon={rating >= i ? 'fak fa-star-solid' : 'fak fa-star-thin'}
          onClick={() => {
            handleUserInputs('rating', i);
          }}
        />
      );
    }
    return formStarRatingDiv;
  }

  const formStarRating = useMemo(() => createFormStarRating(), [rating]);

  return (
    <fieldset id="rate-by-star">
      <legend id="user-rating">Overall Rating*</legend>
      {formStarRating}
      {keyText}
    </fieldset>
  );
}

export default StarRating;
