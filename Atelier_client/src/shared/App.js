/* global Image */

import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import Loading from './components/Loading.jsx';
import QandAModule from './components/questions_answers_module/QandAModule.jsx';
import ReviewsModule from './components/reviews_module/ReviewsModule.jsx';
import RelatedProducts from './components/RelatedProducts.jsx';
import Overview from './components/overview_module/Overview.jsx';

function App() {
  const { id: paramId } = useParams();
  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  console.log('productData: ', productData);
  console.log('paramId: ', paramId);

  // if (loading) {
  //   return <Loading />;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
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
