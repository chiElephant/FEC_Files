import React, { useState, useEffect } from 'react';
import ReviewsModule from './reviews_module/ReviewsModule.jsx';

function App(props) {
  return (
    <div>
      <h1> The RedBean Atelier App </h1>
      <ReviewsModule
        product_id={71699}
        product_name={'Bright Future Sunglasses'}
      />
    </div>
  );
}

export default App;
