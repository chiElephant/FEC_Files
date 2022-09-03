import { faPray } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import validUrl from 'valid-url';

function AnswerPhotosList({ photos }) {
  return (
    <div>
      {photos.map((photo) => {
        if (validUrl.isUri(photo.url)) {
          return <img key={photo.id} src={photo.url} />;
        }
        return null;
      })}
    </div>
  );
}

export default AnswerPhotosList;
