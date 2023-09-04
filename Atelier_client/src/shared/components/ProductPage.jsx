import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Overview from './overview_module/Overview.jsx';
import QandAModule from './questions_answers_module/QandAModule.jsx';
import RelatedProducts from './RelatedProducts.jsx';

function ProductPage({ data, fetchInitialData }) {
  const { id: paramId } = useParams();
  const location = useLocation();

  const [productData, setProductData] = useState(() => {
    if (typeof window !== 'undefined' && window.__INITIAL_DATA__) {
      return window.__INITIAL_DATA__;
    }
    return data;
  });

  const [loading, setLoading] = useState(productData ? false : true);

  const fetchData = async () => {
    const res = await fetchInitialData({
      API_KEY: CLIENT_API_KEY,
      productId: paramId,
    });
    setProductData(res);
    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      fetchData();
    }
  }, []);

  if (loading) {
    return <i className="loading">🤹‍♂️</i>;
  }

  console.log('related: ', productData.relatedProducts);

  return (
    <div id="components">
      <Overview productData={productData} />
      <RelatedProducts relatedProducts={productData.relatedProducts} />
      <QandAModule
        product_id={productData.id}
        product_name={productData.name}
        questions_answers={productData.questionsWithAnswers}
      />
    </div>
  );
}

export default ProductPage;
