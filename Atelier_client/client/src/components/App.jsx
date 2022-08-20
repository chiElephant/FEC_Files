import React, { useState, useEffect } from 'react';
import ReviewsModule from './reviews_module/ReviewsModule.jsx'

function App(props) {
  return (
    <div>
      <h1> The RedBean Atelier App </h1>
      <ReviewsModule
        productId={71698}
        productName={'Bright Future Sunglasses'}/>
    </div>
  );
}

export default App;
