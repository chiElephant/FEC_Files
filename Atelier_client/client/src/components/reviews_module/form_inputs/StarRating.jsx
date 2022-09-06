import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

function StarRating ( {rating, setRating} ) {

  const [starDiv, setStarDiv] = useState(<div />);

  useEffect(() => {
    createStarDiv();
  }, [rating])

  const starKey = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Great',
  }

  const keyText = starKey[rating];

  function createStarDiv () {
    let div = [];

    for (let i = 1; i <= 5; i++ ) {
      div.push(
        <FontAwesomeIcon
          key={`${i}`}
          id={`star-${i}`}
          icon={rating >= i ? solid('star') : regular('star')}
          onClick={() => {
            setRating(i);
          }}
        />
      )
    }
    setStarDiv(div);
  }

  return (
    <fieldset id="rate-by-star" >
      <legend>Overall Rating</legend>
      {starDiv}
      {keyText}
    </fieldset>
  )
}

export default StarRating;