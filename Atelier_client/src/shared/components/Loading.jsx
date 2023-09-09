import React from 'react';
import loadingGif from '../images/loading.gif';

function Loading() {
  return (
    <div className="loading-container">
      <img className="loading-gif" src={loadingGif} alt="Loading..." />
    </div>
  );
}

export default Loading;
