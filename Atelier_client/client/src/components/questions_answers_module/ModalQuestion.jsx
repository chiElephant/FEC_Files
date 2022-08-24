import React, { useState, useEffect } from 'react';
import addQuestion from './helper_functions/addQuestion';

function ModalQuestion({ productName, productId, showModal }) {
  function onClose() {
    showModal();
  }

  return (
    <div className="modal">
      <div className="content">
        <h1>Ask Your Question</h1>
        <h2>About the {productName}</h2>
        <div>
          <label>Your Question</label>
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

export default ModalQuestion;
