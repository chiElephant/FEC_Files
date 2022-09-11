import React from 'react';

function PhotoModal({ photoURL, viewPhoto, closeModal }) {
  return !viewPhoto ? (
    ''
  ) : (
    <div id="photo-window">
      <div id="modal-photo">
        <div onClick={() => closeModal()}>
          <i
            className="fak fa-square-xmark-light fa-2xl"
            id="photo-window-icon"
          ></i>
        </div>
        <img
          className="modal-photo"
          src={photoURL}
          alt="Photo Not Available"
        ></img>
      </div>
    </div>
  );
}

export default PhotoModal;
