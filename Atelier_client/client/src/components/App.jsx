import React, { useState, useEffect } from 'react';
import Overview from './Overview.jsx';
import QandAModule from './questions_answers_module/QandAModule.jsx';
import ReviewsModule from './reviews_module/ReviewsModule.jsx';

function App(props) {
  const [product_id, setProduct_id] = useState(71699);
  const [productName, setProductName] = useState('Morning Joggers');

  return (
    <div>
      <h1> The RedBean Atelier App </h1>
      {/* <Overview product_id={product_id} /> */}
      <ReviewsModule product_id={product_id} product_name={productName} />
      <QandAModule product_id={product_id} product_name={productName} />
    </div>
  );
}

export default App;
