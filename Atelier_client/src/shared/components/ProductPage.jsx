import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Overview from './overview_module/Overview.jsx';
import RelatedProducts from './RelatedProducts.jsx';
import QandAModule from './questions_answers_module/QandAModule.jsx';
import ReviewsModule from './reviews_module/ReviewsModule.jsx';
import '../styles/overview-styles.css';

function ProductPage({ data }) {
  const { id: paramId } = useParams();
  const [productData, setProductData] = useState(() => {
    if (typeof window !== 'undefined' && window.__INITIAL_DATA__) {
      return window.__INITIAL_DATA__;
    }
    return data;
  });

  const [loading, setLoading] = useState(productData ? false : true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/products/${paramId}`);
      setProductData(res.data);
      setLoading(false);
    } catch (err) {
      setError(`Error fetching data: ${err}`);
    }
  };

  useEffect(() => {
    if (!window.__INITIAL_DATA__) {
      setLoading(true);
      fetchData();
    }
  }, [paramId]);

  const resetProductData = () => {
    window.__INITIAL_DATA__ = null;
    setProductData(null);
    setLoading(true);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading....🤹</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Overview productData={productData} />
      <RelatedProducts
        relatedProducts={productData.relatedProducts}
        resetProductData={resetProductData}
      />
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

export default ProductPage;
