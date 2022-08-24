
import React, { useState, useEffect } from 'react';
import Overview from './Overview.jsx';
import ReviewsModule from './reviews_module/ReviewsModule.jsx';

function App (props) {

  const [product_id, setProduct_id] = useState(71697);

  return (
    <div>
      <h1> The RedBean Atelier App </h1>
      <Overview product_id={product_id} />
      <ReviewsModule
        product_id={71699}
        product_name={'Bright Future Sunglasses'}
      />

    </div>
  )


export default App;
