/* global Image */

import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import Loading from './Loading.jsx';
import QandAModule from './questions_answers_module/QandAModule.jsx';
import ReviewsModule from './reviews_module/ReviewsModule.jsx';
import RelatedProducts from './RelatedProducts.jsx';
import Overview from './overview_module/Overview.jsx';

function App() {
  const { id: paramId } = useParams();
  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkImagesLoaded = (imageUrls) => {
    const promises = imageUrls.map(
      (url) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve();
          img.onerror = (err) => reject(err);
        })
    );

    return Promise.all(promises);
  };

  const fetchData = async () => {
    try {
      const [productResponse, relatedProductsResponse] = await Promise.all([
        axios.get(`/products/${paramId}`),
        axios.get(`/products/${paramId}/related`),
      ]);

      const displayPicUrl = productResponse.data.styles[0].photos[0].url;
      const relatedProductPicUrls = relatedProductsResponse.data
        .filter((product) => product.photo !== null)
        .map((product) => product.photo);

      const imageUrls = [displayPicUrl, ...relatedProductPicUrls];

      await checkImagesLoaded(imageUrls);
      setProductData(productResponse.data);
      setRelatedProducts(relatedProductsResponse.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [paramId]);

  console.log('productData: ', productData);
  console.log('paramId: ', paramId);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    // <Suspense fallback={<div>Test</div>}>
    //   {productData && (
    <div id="components">
      <Overview productData={productData} />
      <RelatedProducts relatedProducts={relatedProducts} />
      <QandAModule
        product_id={productData.id}
        product_name={productData.name}
        questions_answers={productData.questionsWithAnswers}
      />
      <ReviewsModule
        product_id={productData.id}
        product_name={productData.name}
        reviewsData={productData.reviews}
        metaData={productData.metaData}
      />
    </div>
  );
}

export default App;
