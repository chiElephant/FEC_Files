import React, { useState, useEffect } from 'react';

function AddToCart (props) {

  const [styleAvail, setStyleAvail] = useState({});
  const [outOfStock, setOutOfStock] = useState(true);
  const [sizeSelected, setSizeSelected] = useState('');
  const [quantities, setQuantities] = useState(0);

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
    console.log(outOfStock);

  };

  var handleSizeChange = (e) => {
    // console.log(e.target.value);
    setSizeSelected(e.target.value);
  };

  useEffect(() => {
    console.log('The AddToCart component mounted!');
    availability(props.style.skus);
  }, [props.style]);

  useEffect(() => {
    var qtys = [];
    console.log(styleAvail[sizeSelected]);
    var qty = styleAvail[sizeSelected];
    for (var i = 0; i < qty; i++) {
      qtys.push(i+1);
    }
    if (qtys.length > 15) {
      qtys = qtys.slice(0, 15);
    };
    setQuantities(qtys);
  }, [sizeSelected])

  if (outOfStock === false) {
    return (
      <div className='add-to-cart'>
        <select selected='Select Size' onChange={(e) => {
          handleSizeChange(e);
        }}>
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

          {
            !sizeSelected
              ? <select disabled>
                  <option> - </option>
                </select>
              : <select>
                  <option selected> 1 </option>
                  {
                    quantities.map((num) => {
                      return (
                        <option value={num}>{num}</option>
                      )
                    })
                  }
                </select>
          }

      </div>
    )

  }
}

export default AddToCart;