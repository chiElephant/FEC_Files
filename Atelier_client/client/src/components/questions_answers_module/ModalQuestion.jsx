import React, { useState, useEffect } from 'react';

function ModalQuestion({ productName, productId, showModal }) {
  function onClose() {
    showModal();
  }

  return (
    <div className="modal">
      <div className="content">
        <h1>Ask Your Question</h1>
        <h2>About the {productName}</h2>
      </div>
      <button className="toggle-button" onClick={onClose}>
        close
      </button>
    </div>
  );
}

export default ModalQuestion;
