import React, { useState, useEffect } from 'react';
import addAnswer from './helper_functions/addAnswer';

function ModalAnswer({ productName, productId, showModal, questionBody }) {
  function onClose() {
    showModal();
  }

  return (
    <div className="modal">
      <div className="content">
        <h1>Ask Your Question</h1>
        <h2>
          {productName}:{questionBody}
        </h2>
        <div>
          <label>Your Answer</label>
          <textarea></textarea>
        </div>
        <div>
          <label>What is your nickname</label>
          {/* <input type="text"> */}
        </div>
        <div>
          <label>Your email</label>
          {/* <input type="text"> */}
        </div>
      </div>
      <button className="toggle-button" onClick={onClose}>
        close
      </button>
    </div>
  );
}

export default ModalAnswer;
