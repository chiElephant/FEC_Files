import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

function StarRating ( {rating, setRating} ) {

  const [starDiv, setStarDiv] = useState(<div />);

  useEffect(() => {
    createStarDiv();
  }, [rating])

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
    </fieldset>
  )
}

export default StarRating;