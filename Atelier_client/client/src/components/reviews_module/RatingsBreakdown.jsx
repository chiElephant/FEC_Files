import React, { useState, useEffect } from 'react';
import ProductBreakdown from './ProductBreakdown.jsx';
import axios from 'axios';

function RatingsBreakdown ( {product_id} ) {

  const [metadata, setMetadata] = useState([]);
  const [ratings, setRatings] = useState ('');
  const [recommended, setRecommend] = useState('');
  const [characteristics, setCharacteristics] = useState({});

  return (
    <div>
      <h3>Rating Breakdown</h3>
      <div>{'ratings'}</div>
      <div>ratings breakdown graph</div>
      <div>{'recommended'}</div>
      <ProductBreakdown
        metadata={characteristics}/>
    </div>
  )
}

export default RatingsBreakdown;