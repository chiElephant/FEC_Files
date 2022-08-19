import React, { useState, useEffect } from 'react';
import { createCharsDiv  } from './helper_functions/product_bd.jsx'

function ProductBreakdown ({ characteristics } ) {
  const [size, setSize] = useState('');
  const [width, setWidth] = useState('');
  const [comfort, setComfort] = useState('');
  const [quality, setQuality] = useState('');
  const [length, setLength] = useState('');
  const [fit, setFit] = useState('');
  const [divElement, setDivElement] = useState([])

  useEffect(() => {
    const div = createCharsDiv(characteristics)
    setDivElement(div)
  }, [characteristics])

  return (
    <div>
      <h3>Product Breakdown</h3>
      <div id="char-div">
        {divElement}
      </div>
    </div>
  )
}

export default ProductBreakdown;