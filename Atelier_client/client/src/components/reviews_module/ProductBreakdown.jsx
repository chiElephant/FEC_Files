import React, { useState, useEffect } from 'react';

function ProductBreakdown ({ metadata } ) {

  const [size, setSize] = useState(metadata.Size);
  const [width, setWidth] = useState(metadata.Width);
  const [comfort, setComfort] = useState(metadata.Comfort);

  return (
    <div>
      <h3>Product Breakdown</h3>
      <div>{JSON.stringify(size)}</div>
      <div>{JSON.stringify(width)}</div>
      <div>{JSON.stringify(comfort)}</div>
    </div>
  )
}

export default ProductBreakdown;