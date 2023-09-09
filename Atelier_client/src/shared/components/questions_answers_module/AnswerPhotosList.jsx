/* eslint-disable react/no-array-index-key */
/* global Image */
import React, { useState, useEffect } from 'react';
import defaultImage from '../global-helpers/defaultImage';

function AnswerPhotosList({ photos }) {
  const [loadedPhotos, setLoadedPhotos] = useState({});

  return (
    <div className="answer_img_list">
      {photos.map((photo, id) => {
        const picture = typeof photo === 'object' ? photo.url : photo;

        const isPhotoAvailable = loadedPhotos[id]
          ? 'Available'
          : 'Not available';

        return (
          <img
            alt={isPhotoAvailable}
            key={id}
            src={loadedPhotos[id] ? picture : defaultImage}
          />
        );
      })}
    </div>
  );
}

export default AnswerPhotosList;
