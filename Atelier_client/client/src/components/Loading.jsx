import React from 'react';
import loadingGif from '../../dist/images/loading.gif';

function Loading() {
  return (
    <div className="loading-container">
      <img className="loading-gif" src={loadingGif} alt="Loading..." />
    </div>
  );
}

export default Loading;
