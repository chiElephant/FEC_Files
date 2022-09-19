import React from 'react';
import validUrl from 'valid-url';

function AnswerPhotosList({ photos }) {
  return (
    <div className="answer-img">
      {photos.map((photo) => {
        const picture = typeof photo === 'object' ? photo.url : photo;
        const id = typeof photo === 'object' ? photo.id : photo;
        if (validUrl.isUri(picture)) {
          return (
            <img id="answer-img" alt="not available" key={id} src={picture} />
          );
        }
      })}
    </div>
  );
}

export default AnswerPhotosList;
