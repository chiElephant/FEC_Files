import React, { useState, useEffect } from 'react';
import { createCharsDiv  } from './helper_functions/product_bd.jsx'

function ProductBreakdown ({ characteristics } ) {
  const [comfort, setComfort] = useState( {Comfort: {id: '', value: ''}} );
  const [quality, setQuality] = useState( {Quality: {id: '', value: ''}} );
  const [length, setLength] = useState( {Length: {id: '', value: ''}} );
  const [width, setWidth] = useState( {Width: {id: '', value: ''}} );
  const [size, setSize] = useState( {Size: {id: '', value: ''}} );
  const [fit, setFit] = useState( {Fit: {id: '', value: ''}} );
  const [divElement, setDivElement] = useState(<div></div>)

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