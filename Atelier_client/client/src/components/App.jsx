import React, { useState, useEffect } from 'react';
import Overview from './overview_module/Overview.jsx';
import QandAModule from './questions_answers_module/QandAModule.jsx';
import ReviewsModule from './reviews_module/ReviewsModule.jsx';
import Topbar from './overview_module/Topbar.jsx';

function App(props) {
  const [product_id, setProduct_id] = useState(71701);
  const [productName, setProductName] = useState('Heir Force Ones');

  return (
    <div>
      <Topbar />
      <Overview product_id={product_id} />
      <ReviewsModule product_id={product_id} product_name={productName} />
      <QandAModule product_id={product_id} product_name={productName} />
    </div>
  );
}

export default App;
