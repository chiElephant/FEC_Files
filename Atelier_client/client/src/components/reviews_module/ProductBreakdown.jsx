import React, { useState, useEffect } from 'react';

function ProductBreakdown({ characteristics }) {
  const [charsDiv, setCharsDiv] = useState(<div />);

  useEffect(() => {
    createCharsDiv();
  }, [characteristics]);

  function createCharsDiv() {
    const newCharDiv = [];

    const poorAndGreat = [
      <div id="poor" key="poor">
        Poor
      </div>,
      <div id="great" key="great">
        Great
      </div>,
    ];

    const bigAndSmall = [
      <div id="too-small" key="small">
        Too Small
      </div>,
      <div id="perfect" key="perfect">
        Perfect
      </div>,
      <div id="too-big" key="big">
        Too Big
      </div>,
    ];

    for (let char in characteristics) {
      if (characteristics[char] !== null) {
        const key = characteristics[char].id;
        const value = Math.floor(characteristics[char].value);
        let element;

        if (char === 'Comfort' || char === 'Quality') {
          element = poorAndGreat;
        } else {
          element = bigAndSmall;
        }
        newCharDiv.push(
          <div className="characteristic" key={key}>
            <div className="char-name">{`${char}`}</div>
            <div className="char-meter">
              <i
                className="char-icon"
                className="fak fa-triangle-solid fa-flip-vertical"
                style={{ marginLeft: value * 20 + '%' }}
              ></i>
            </div>
            <div className="breakdown-descrip">{element}</div>
          </div>
        );
      }
    }

    setCharsDiv((charsDiv) => newCharDiv);
  }

  return (
    <div>
      <h3 hidden>Product Breakdown</h3>
      {charsDiv}
    </div>
  );
}

export default ProductBreakdown;
