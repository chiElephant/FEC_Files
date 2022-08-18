import React, { useState, useEffect } from 'react';

function ProductBreakdown ({ metadata } ) {

  const [size, setSize] = useState(metadata.Size);
  const [width, setWidth] = useState(metadata.Width);
  const [comfort, setComfort] = useState(metadata.Comfort);

  return (
    <div>
      <h3>Product Breakdown</h3>
      <div>{'size'}</div>
      <div>{'width'}</div>
      <div>{'comfort'}</div>
    </div>
  )
}

export default ProductBreakdown;