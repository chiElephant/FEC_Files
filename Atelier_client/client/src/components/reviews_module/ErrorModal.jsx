import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function ErrorModal({ error, errorModal, setErrorModal }) {
  return errorModal ? (
    <div id="error-window">
      <div id="error-modal">
        <div>
          <FontAwesomeIcon
            id="error-modal-icon"
            icon={solid('square-xmark')}
            size="lg"
            onClick={() => setErrorModal(errorModal => false)}
          />
        </div>
        <div id="error">{`You Must Enter Ehe Following: ${error.toUpperCase()}`}</div>
        <div id="error-msg">{'Missing or Incorrect Format'}</div>
      </div>
    </div>
  ) : (
    ''
  );
}

export default ErrorModal;
