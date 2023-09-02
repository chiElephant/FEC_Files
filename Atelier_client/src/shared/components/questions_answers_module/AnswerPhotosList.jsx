/* eslint-disable react/no-array-index-key */
/* global Image */
import React, { useState, useEffect } from 'react';
import defaultImage from '../global-helpers/defaultImage';

function AnswerPhotosList({ photos }) {
  const [loadedPhotos, setLoadedPhotos] = useState({});

  useEffect(() => {
    const loadPhotos = async () => {
      const loaded = {};

      await Promise.all(
        photos.map(async (photo, id) => {
          const picture = typeof photo === 'object' ? photo.url : photo;

          try {
            await new Promise((resolve) => {
              const img = new Image();

              img.onload = () => {
                loaded[id] = true;
                resolve();
              };

              img.onerror = () => {
                loaded[id] = false;
                resolve();
              };

              img.src = picture;
            });
          } catch (error) {
            console.error('Error loading image:', error);
          }
        })
      );

      setLoadedPhotos(loaded);
    };

    loadPhotos();
  }, [photos]);

  return (
    <div className="answer-img">
      {photos.map((photo, id) => {
        const picture = typeof photo === 'object' ? photo.url : photo;

        const isPhotoAvailable = loadedPhotos[id]
          ? 'Available'
          : 'Not available';

        return (
          <img
            id="answer-img"
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
