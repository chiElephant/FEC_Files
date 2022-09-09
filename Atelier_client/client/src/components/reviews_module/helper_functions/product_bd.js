import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, light, thin } from '@fortawesome/fontawesome-svg-core/import.macro';

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
          <div className="char-meter">
            <FontAwesomeIcon
              id="char-icon"
              icon={(solid('triangle'))}
              style={{width: (value * 40) + '%'}}
              flip='vertical'
            />
          </div>
        </div>
      );
    }
  }

  return charDiv;
}

export default createCharsDiv;
