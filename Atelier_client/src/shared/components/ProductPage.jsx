import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Overview from './overview_module/Overview.jsx';
import QandAModule from './questions_answers_module/QandAModule.jsx';
import RelatedProducts from './RelatedProducts.jsx';

function ProductPage({ data }) {
  const { id: paramId } = useParams();
  const location = useLocation();

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
      setError(null);
      location.state = null;
    } catch (err) {
      setError(`Error fetching data: ${err}`);
    }
  };

  useEffect(() => {
    if (loading || location.state) {
      fetchData();
    }
  }, [paramId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading || location.state) {
    return <div>Loading....🤹</div>;
  }

  return (
    <div id="components">
      <Overview productData={productData} />
      <RelatedProducts relatedProducts={productData.relatedProducts} />
      {/* <QandAModule
        product_id={productData.id}
        product_name={productData.name}
        questions_answers={productData.questionsWithAnswers}
      /> */}
    </div>
  );
}

export default ProductPage;
