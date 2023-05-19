import React, { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';
import Topbar from './Topbar.jsx';
import Overview from './overview_module/Overview.jsx';
import { getProductData, getMetadata } from '../lib/dataHandlers.js';
// import QandAModule from './questions_answers_module/QandAModule.jsx';
// import ReviewsModule from './reviews_module/ReviewsModule.jsx';
// import ProductLinks from './ProductLinks.jsx';

function App() {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentMetadata, setCurrentMetadata] = useState(null);
  const altPhoto = useRef(
    'https://res.cloudinary.com/dxvlke88h/image/upload/v1684474914/3309274_0_zyxev2.png'
  );
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    const productId = id || 1;

    async function handleProductId() {
      const product = await getProductData(productId);
      setCurrentProduct(product);
    }

    async function handleMetadata() {
      const meta = await getMetadata(productId);
      setCurrentMetadata(meta);
    }

    handleProductId();
    handleMetadata();
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
    currentProduct === null ? null : (
      <>
        <Overview
          product={currentProduct}
          metadata={currentMetadata}
          altPhoto={altPhoto.current}
        />
        {/* <QandAModule id={productId} product_name={productName} /> */}
        {/* <ReviewsModule
          id={currentProduct !== null ? currentProduct.id : null}
          product_name={currentProduct !== null ? currentProduct.name : null}
        /> */}
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
