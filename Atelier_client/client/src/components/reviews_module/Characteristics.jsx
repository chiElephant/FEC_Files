import React, { useState, useEffect } from 'react';
import charsKey from './helper_functions/characteristics'

function Characteristics ( { characteristics, productChars, setProductChars} ) {

  const [charsDiv, setCharsDiv] = useState(<div />);
  const [charRatings, setCharRatings] = useState({});

  useEffect(() => {
    createCharsDiv();
  }, [])


   // Handles user input on product characteristics when adding a review.
   const handleCharacteristics = (char, id, value) => {
    console.log(char, id, value)

    //it wont work beacause it keeps trying to rest the info to the original empty productChar object
    setProductChars({
      ...productChars,
      [id]: value
    });

    handleCharText(char, id, value);
    setProductChars(charRatings);
  };

  // Handles the text output above each characteristic in the add review form.
  const handleCharText = (char, id, value) => {
    const currentDisplay = document.getElementById(id);
    const newDisplay = charsKey[char][value];
    currentDisplay.textContent = newDisplay;
  };

  // Creates the characteristics div in the add review form.
  const createCharsDiv = () => {
    let div = [];

    for (let char in characteristics) {
      const id = characteristics[char].id;
      div.push(
        <div id="add-characteristic" key={id}>
          <span id={id} className="char-descrip-output">None Selected</span>
          <br />
          <label className="char-radios-text">
            {`${char}`}
            <div id="char-radios">

              <input
                id={id}
                className="char-radios"
                type="radio"
                name={`${char}`}
                value="1"
                onClick={() =>
                  handleCharacteristics(char, id, 1)}
              />
              <input
                id={id}
                className="char-radios"
                type="radio"
                name={`${char}`}
                value="2"
                onClick={() =>
                  handleCharacteristics(char, id, 2)}
              />
              <input
                id={id}
                className="char-radios"
                type="radio"
                name={`${char}`}
                value="3"
                onClick={() =>
                  handleCharacteristics(char, id, 3)}
              />
              <input
                id={id}
                className="char-radios"
                type="radio"
                name={`${char}`}
                value="4"
                onClick={() =>
                  handleCharacteristics(char, id, 4)}
              />
              <input
                id={id}
                className="char-radios"
                type="radio"
                name={`${char}`}
                value="5"
                onClick={() =>
                  handleCharacteristics(char, id, 5)
                }
              />
            </div>
          </label>
          <br />
          <span className="char-descrip"> {`(1) ${charsKey[char][1]}`} </span>
          <span className="char-descrip"> {`(5) ${charsKey[char][5]}`} </span>
        </div>
      );
    }
    setCharsDiv(div);
  };

  return (
    <fieldset id="characteristics-radios">
      <legend>Characteristics</legend>
      {charsDiv}
    </fieldset>
  )
}

export default Characteristics;