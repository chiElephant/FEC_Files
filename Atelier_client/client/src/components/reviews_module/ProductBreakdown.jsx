import React, { useState, useEffect } from 'react';

function ProductBreakdown ({ metadata } ) {

  const [size, setSize] = useState('');
  const [width, setWidth] = useState('');
  const [comfort, setComfort] = useState('');
  const [quality, setQuality] = useState('');
  const [divElement, setDivElement] = useState([])

  useEffect(() => {
    handleMetadata()
  }, [metadata])

  const handleMetadata = () => {

  const charDiv = []

    if(Object.keys(metadata).length !== 0) {
      for (let char in metadata) {
        const key = metadata[char].id
        const value = Math.floor(metadata[char].value)
        charDiv.push(
        <div
          className="characteristic"
          key={key}>
          {`${char}: average rating ${value}`}
        </div>
        )
      }
    }
    setDivElement(charDiv)
  }

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