import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, light, thin } from '@fortawesome/fontawesome-svg-core/import.macro';

function createCharsDiv(metadata) {
  const charDiv = [];

  const poorAndGreat = [
    <div id="poor" key="poor">Poor</div>,
    <div id="great" key="great">Great</div>
  ]

  const bigAndSmall = [
    <div id="too-small" key="small">Too Small</div>,
    <div id="perfect" key="perfect">Perfect</div>,
    <div id="too-big" key="big">Too Big</div>
  ]

  for (let char in metadata) {

    if (metadata[char] !== null) {

      const key = metadata[char].id;
      const value = Math.floor(metadata[char].value);
      let element;

      if (char === 'Comfort' || char === 'Quality') {
        element = poorAndGreat;
      } else {
        element = bigAndSmall;

      }
      charDiv.push(
        <div className="characteristic" key={key}>
          <div className="char-name">
            {`${char}`}
          </div>
          <div className="char-meter">
            <FontAwesomeIcon
              id="char-icon"
              icon={(solid('triangle'))}
              style={{width: (value * 20) + '%'}}
              flip='vertical'
              />
          </div>
          <div id="breakdown-descrip">
              {element}
          </div>
        </div>
      );
    }
  }

  return charDiv;
}

export default createCharsDiv;
