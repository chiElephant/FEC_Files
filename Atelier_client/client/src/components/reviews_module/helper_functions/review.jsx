import React from 'react';
import moment from 'moment';

const helpers = {
  convertDate: (date) => moment(date).format('MMMM DD YYYY'),

  handlePhotos: (photos) => {
    const photoDiv = [];

    if (photos !== null) {
      photos.forEach((photo) => {
        photoDiv.push(
          <img
            key={photo.id}
            src={photo.url}
            alt="image not available"
            width="120"
          />
        );
      });
    }
    return photoDiv;
  },
};

export { helpers };
