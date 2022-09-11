import React from 'react';

function ErrorModal({ error, errorModal, setErrorModal }) {
  return errorModal ? (
    <div id="error-window">
      <div id="error-modal">
        <div onClick={() => setErrorModal((errorModal) => false)}>
          <i
            className="fak fa-square-xmark-light fa-lg"
            id="error-modal-icon"
          ></i>
        </div>
        <div id="error">{`You must enter the following: ${error.toUpperCase()}`}</div>
        <div id="error-msg">{'missing field or incorrect format'}</div>
      </div>
    </div>
  ) : (
    ''
  );
}

export default ErrorModal;
