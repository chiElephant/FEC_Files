import React, { useState, useEffect } from 'react';

function AddToCart (props) {

  const [styleAvail, setStyleAvail] = useState({});
  const [outOfStock, setOutOfStock] = useState(true);

  var availability = async (skus) => {
    var resultObj = {};
    const skusArray = await Object.entries(skus);
      skusArray.forEach((size) => {
      var sizesArray = Object.entries(size[1]);
      resultObj[sizesArray[1][1]] = sizesArray[0][1];
    });
    setStyleAvail(resultObj);

    for (const size in resultObj) {
      if (resultObj[size] > 0) {
        setOutOfStock(false);
      }
    }
    // resultObj.forEach((qty) => {
    //   if (qty > 0) {
    //     outOfStock = false;
    //   }
    // });
    console.log(outOfStock);

  };

  useEffect(() => {
    console.log('The AddToCart component mounted!');
    availability(props.style.skus);
  }, [props.style]);

  if (outOfStock === false) {
    return (
      <div className='add-to-cart'>
        <div>The selected style id is</div>
        <select selected='Select Size'>
          <option value="" selected disabled hidden>Select Size</option>
          {
            Object.keys(styleAvail).map((size) => {
              if (styleAvail[size] !== 0) {
                return (
                  <option value={size}>{size}</option>
                )
              }
            })
          }
        </select>
      </div>
    )

  }
}

export default AddToCart;