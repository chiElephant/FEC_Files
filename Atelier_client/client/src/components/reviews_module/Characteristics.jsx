import React, { useState, useEffect } from 'react';

function Characteristics ( { characteristics, setProductChars } ) {

  const [charsDiv, setCharsDiv] = useState(<div />);

  useEffect(() => {
    createCharsDiv();
  }, [characteristics])

   // Characteristics key for the text output above each characteristic in the add review form
   const charsKey = {
    Size: {
      1: 'A size too small',
      2: '1/2 size too small',
      3: 'Perfect',
      4: '1/2 size too big',
      5: 'A size too wide',
    },
    Width: {
      1: 'Too narrow',
      2: 'Slightly narrow',
      3: 'Perfect',
      4: 'Slightly wide',
      5: 'Too wide',
    },
    Comfort: {
      1: 'Uncomfortable',
      2: 'Slightly uncomfortable',
      3: 'Ok',
      4: 'Comfortable',
      5: 'Perfect',
    },
    Quality: {
      1: 'Poor',
      2: 'Below Average',
      3: 'What I expected',
      4: 'Pretty great',
      5: 'Perfect',
    },
    Length: {
      1: 'Runs short',
      2: 'Runs slightly short',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long',
    },
    Fit: {
      1: 'Runs tight',
      2: 'Runs slightly tight',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long',
    },
  };

   // Handles user input on product characteristics when adding a review.
   const handleCharacteristics = (char, id, value) => {
    let chars = {};
    chars[`${id}`] = value;
    setProductChars(chars);
    handleCharSelection(char, id, value);
  };

  // Handles the text output above each characteristic in the add review form.
  const handleCharSelection = (char, id, value) => {
    const currentDisplay = document.getElementById(id);
    const newDisplay = charsKey[char][value];
    currentDisplay.textContent = newDisplay;
  };

  // Creates the characteristics div in the add review form.
  const createCharsDiv = () => {
    let div = [];

    for (let char in characteristics) {
      div.push(
        <div key={characteristics[char].id}>
          <span id={characteristics[char].id}>None Selected</span>
          <br />
          <label>
            {`${char}`}
            <input
              className={characteristics[char].id}
              type="radio"
              name={`${char}`}
              value="1"
              onClick={() => handleCharacteristics(char, characteristics[char].id, 1)}
            />
            <input
              className={characteristics[char].id}
              type="radio"
              name={`${char}`}
              value="2"
              onClick={() => handleCharacteristics(char, characteristics[char].id, 2)}
            />
            <input
              className={characteristics[char].id}
              type="radio"
              name={`${char}`}
              value="3"
              onClick={() => handleCharacteristics(char, characteristics[char].id, 3)}
            />
            <input
              className={characteristics[char].id}
              type="radio"
              name={`${char}`}
              value="4"
              onClick={() => handleCharacteristics(char, characteristics[char].id, 4)}
            />
            <input
              className={characteristics[char].id}
              type="radio"
              name={`${char}`}
              value="5"
              onClick={() =>
                handleCharacteristics(char, `${characteristics[char].id}`, 5)
              }
            />
          </label>
          <br />
          <span>{`${charsKey[char][1]} (1)   ${charsKey[char][5]} (5)`}</span>
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