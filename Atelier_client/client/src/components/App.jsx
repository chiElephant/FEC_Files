import React, { useState, useEffect } from 'react';
import ReviewsModule from './reviews_module/ReviewsModule.jsx'

function App(props) {
  return (
    <div>
      <h1> The RedBean Atelier App </h1>
      <ReviewsModule />
    </div>
  );
}

export default App;
