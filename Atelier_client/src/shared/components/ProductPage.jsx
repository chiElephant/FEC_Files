import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Overview from './overview_module/Overview.jsx';

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
      API_KEY: CLIENT_API_KEY || '',
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

  return (
    <div id="components">
      <Overview productData={productData} />
    </div>
  );
}

export default ProductPage;
