// import React from 'react';

function createCharsDiv(metadata) {
  const charDiv = [];

  for (let char in metadata) {
    if (metadata[char] !== null) {
      const key = metadata[char].id;
      const value = Math.floor(metadata[char].value);
      charDiv.push(
        <div className="characteristic" key={key}>
          {`${char}: ${value} avg`}
        </div>
      );
    }
  }

  return charDiv;
}

export default createCharsDiv;
