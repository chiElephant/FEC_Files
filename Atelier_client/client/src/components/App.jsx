import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Overview from './overview_module/Overview.jsx';
import QandAModule from './questions_answers_module/QandAModule.jsx';
import ReviewsModule from './reviews_module/ReviewsModule.jsx';
import ProductLinks from './ProductLinks.jsx';

function App() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(71697);
  const [productName, setProductName] = useState('Camo Onesie');

  console.log('id ', id);

  useEffect(() => {
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

  useEffect(() => {
    axios.get(`/products/${id}`).then((res) => {
      // console.log('res: ', res);

      setProductName(res.data.name);
      setProductId(res.data.id);
    });
  }, [id]);

  return (
    <div>
      <h1> The RedBean Atelier App </h1>
      <ProductLinks products={products} />
      <Overview product_id={productId} />
      <ReviewsModule product_id={productId} product_name={productName} />
      <QandAModule product_id={productId} product_name={productName} />
    </div>
  );
}

export default App;
