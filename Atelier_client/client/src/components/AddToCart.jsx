import React, { useState, useEffect } from 'react';

function AddToCart (props) {

  const [styleAvail, setStyleAvail] = useState({});
  var availability = async (skus) => {
    var resultObj = {};
    const skusArray = await Object.entries(skus);
    skusArray.forEach((size) => {
      var sizesArray = Object.entries(size[1]);
      resultObj[sizesArray[1][1]] = sizesArray[0][1];
    });
    console.log(resultObj);
    setStyleAvail(resultObj);
  };

  useEffect(() => {
    console.log('The AddToCart component mounted!');
    availability(props.style.skus);
  }, [props.style]);

  return (
    <div className='add-to-cart'>
      <div>The selected style id is</div>
      <select>

      </select>
    </div>
  )
}

export default AddToCart;