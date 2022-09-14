import React, { useState, useEffect } from 'react';
import Overview from './overview_module/Overview.jsx';
import QandAModule from './questions_answers_module/QandAModule.jsx';
import ReviewsModule from './reviews_module/ReviewsModule.jsx';
import Topbar from './overview_module/Topbar.jsx';

function App(props) {
  const [product_id, setProduct_id] = useState(71701);
  const [productName, setProductName] = useState('Heir Force Ones');

document.querySelector('body').addEventListener('click', clickHandling);

function clickHandling(e) {
  const attr = e.target.attributes
  const source = e.target.attributes[0];
  const parent = e.target.attributes[1];
  console.log(attr, source.value, parent);
}

  return (
    <div>
      {/* <Topbar />
      <Overview product_id={product_id} /> */}
      <ReviewsModule product_id={product_id} product_name={productName} />
      {/* <QandAModule product_id={product_id} product_name={productName} /> */}
    </div>
  );
}

export default App;
