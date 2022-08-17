import React, { useState, useEffect } from 'react';
import ProdBreakdown from './ProdBreakdown.jsx';
import { meta } from './seed_data.js';
import axios from 'axios';

function RatingBreakdown ( {product_id} ) {

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
      <ProdBreakdown
        metadata={characteristics}/>
    </div>
  )
}

export default RatingBreakdown;