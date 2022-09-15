import React, { useState, useEffect } from 'react';
import Overview from './overview_module/Overview.jsx';
import QandAModule from './questions_answers_module/QandAModule.jsx';
import ReviewsModule from './reviews_module/ReviewsModule.jsx';
import Topbar from './overview_module/Topbar.jsx';

import axios from 'axios';

function App(props) {
  const [product_id, setProduct_id] = useState(71701);
  const [productName, setProductName] = useState('Heir Force Ones');

  // const body = document.querySelector('body');
  // body.onclick = function(e) {
  //   // e.preventDefault();

  //   console.log(e.target.attributes)

  //   const element = e.target.attributes[0].value;
  //   const widget = e.target.attributes[1].value;
  //   const time = new Date().toString().split(' ')[4];

  //   if (element && widget) {
  //     axios.post('/interactions', { element, widget, time })
  //       .then(response => {
  //         console.log(response.status, response.data);
  //       })
  //       .catch(error => {
  //         console.log('Error in click event listener: ', error);
  //       })
  //   }
  // };

  return (
    <div>
      {/* <Topbar /> */}
      {/* <Overview product_id={product_id} />  */}
      <ReviewsModule product_id={product_id} product_name={productName} />
      {/* <QandAModule product_id={product_id} product_name={productName} /> */}
    </div>
  );
}

export default App;
