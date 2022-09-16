import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import Overview from './overview_module/Overview.jsx';
import QandAModule from './questions_answers_module/QandAModule.jsx';
import ReviewsModule from './reviews_module/ReviewsModule.jsx';
import ProductLinks from './ProductLinks.jsx';
import Topbar from './Topbar.jsx';

function App() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(0);
  const [productName, setProductName] = useState('');

  useEffect(() => {
    axios.get(`/products/${id}`).then((res) => {
      setProductName(res.data.name);
      setProductId(res.data.id);
    });
  }, [id]);

  useEffect(() => {
    console.log('fire');
    const options = {
      method: 'get',
      url: `/products`,
    };

    axios(options)
      .then((response) => {
        const productList = response.data;
        setProducts([...productList]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const widgets =
    productId !== 0 ? (
      <>
        <Overview product_id={productId} />
        <ReviewsModule product_id={productId} product_name={productName} />
        <QandAModule product_id={productId} product_name={productName} />
      </>
    ) : null;

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
      <Topbar />
      <ProductLinks products={products} />
      {widgets}
    </div>
  );
}

export default App;
