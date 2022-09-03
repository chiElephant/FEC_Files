import React, { useState, useEffect } from 'react';

function AnswerPhotosList({ photos }) {
  return (
    <div>
      {photos.map((photo) => (
        <img key={photo.id} src={photo.url} />
      ))}
    </div>
  );
}

export default AnswerPhotosList;
