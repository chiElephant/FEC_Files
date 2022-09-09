import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function PhotoModal ({ photoURL, viewPhoto, closeModal }) {
  return !viewPhoto ?
    ('') :

    (
      <div id="photo-window">
        <div id="modal-photo">
          <FontAwesomeIcon
            id="photo-window-icon"
            icon={solid("square-xmark")}
            size='3x'
            onClick={() => closeModal()}/>
          <img src={photoURL} alt="Photo Not Available"></img>
        </div>
      </div>
    )
}

export default PhotoModal;