import React, { useState, useEffect } from 'react';
import ProductBreakdown from './ProductBreakdown.jsx';
import { meta } from './seed_data.js';
import axios from 'axios';

function RatingsBreakdown ( {product_id} ) {

  const [metadata, setMetadata] = useState(meta);
  const [ratings, setRatings] = useState (meta.ratings);
  const [recommended, setRecommend] = useState(meta.recommended);
  const [characteristics, setCharacteristics] = useState(meta.characteristics);

  return (
    <div>
      <h3>Rating Breakdown</h3>
      <div>{JSON.stringify(ratings)}</div>
      <div>ratings breakdown graph</div>
      <div>{JSON.stringify(recommended)}</div>
      <ProductBreakdown
        metadata={characteristics}/>
    </div>
  )
}

export default RatingsBreakdown;