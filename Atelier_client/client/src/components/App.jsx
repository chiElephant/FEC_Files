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
  const [productId, setProductId] = useState(0);
  const [productName, setProductName] = useState('');

  console.log('id ', id);

  useEffect(() => {
    axios.get(`/products/${id}`).then((res) => {
      setProductName(res.data.name);
      setProductId(res.data.id);
    });
  }, [id]);

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

  const widgets =
    productId !== 0 ? (
      <>
        <Overview product_id={productId} />
        <ReviewsModule product_id={productId} product_name={productName} />
        <QandAModule product_id={productId} product_name={productName} />
      </>
    ) : null;

  return (
    <div>
      <h1> The RedBean Atelier App </h1>
      <ProductLinks products={products} />
      {/* {widgets} */}
    </div>
  );
}

export default App;
