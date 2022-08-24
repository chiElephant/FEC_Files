import React, { useState, useEffect } from 'react';
import QandAModule from './questions_answers_module/QandAModule.jsx';
import ReviewsModule from './reviews_module/ReviewsModule.jsx';

function App(props) {
  return (
    <div>
      <h1> The RedBean Atelier App </h1>
      <ReviewsModule
        product_id={71699}
        product_name={'Bright Future Sunglasses'}
      />
      <QandAModule />
    </div>
  );
}

export default App;
