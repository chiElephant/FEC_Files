import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import Topbar from './Topbar.jsx';
import Overview from './overview_module/Overview.jsx';
// import QandAModule from './questions_answers_module/QandAModule.jsx';
// import ReviewsModule from './reviews_module/ReviewsModule.jsx';
// import ProductLinks from './ProductLinks.jsx';

function App() {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    const product_id = id || 1;
    axios.get(`/products/${product_id}`).then((res) => {
      setCurrentProduct(res.data);
    });
  }, [id]);

  // useEffect(() => {
  //   const options = {
  //     method: 'get',
  //     url: `/products`,
  //   };

  //   axios(options)
  //     .then((response) => {
  //       const productList = response.data;
  //       setProducts([...productList]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const widgets =
    currentProduct === null ? (
      ''
    ) : (
      <>
        <Overview product_id={currentProduct.id} product={currentProduct} />
        {/* <QandAModule product_id={productId} product_name={productName} />
        <ReviewsModule product_id={productId} product_name={productName} /> */}
      </>
    );

  return (
    <div>
      <Topbar />
      {widgets}
      {/* <ProductLinks products={products} /> */}
    </div>
  );
}

export default App;
