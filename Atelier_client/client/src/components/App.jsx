import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Overview from './overview_module/Overview.jsx';
import QandAModule from './questions_answers_module/QandAModule.jsx';
import ReviewsModule from './reviews_module/ReviewsModule.jsx';
import Topbar from './Topbar.jsx';
import Products from './Products.jsx';
import Loading from './Loading.jsx';

function App() {
  const location = useLocation();
  const { id: paramId } = useParams();
  const [productData, setProductData] = useState({
    id: null,
    campus: null,
    name: null,
    slogan: null,
    description: null,
    category: null,
    created_at: null,
    updated_at: null,
    defaultPrice: null,
    photo: null,
    ratingAverage: null,
    reviewsCount: null,
    features: [],
    styles: [],
    questionsWithAnswers: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProductInfo() {
      try {
        if (location.state && location.state.id) {
          setProductData(location.state);
        } else {
          const response = await axios.get(`/products/${paramId}`);
          setProductData(response.data);
        }
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getProductInfo();
  }, [location.state, paramId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Topbar />
      <Overview productData={productData} />
      <Products />
      <QandAModule
        product_id={productData.id}
        product_name={productData.name}
        questions_answers={productData.questionsWithAnswers}
      />
      <ReviewsModule
        product_id={productData.id}
        product_name={productData.name}
      />
    </div>
  );
}

export default App;
