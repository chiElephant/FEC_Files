// import React from 'react';

function createCharsDiv(metadata) {
  const charDiv = [];

  for (let char in metadata) {
    if (metadata[char] !== null) {
      const key = metadata[char].id;
      const value = Math.floor(metadata[char].value);
      charDiv.push(
        <div className="characteristic" key={key}>
          <div className="char-name">
            {`${char}`}
          </div>
          <div className="char-meter" />
        </div>
      );
    }
  }

  return charDiv;
}

export default createCharsDiv;
