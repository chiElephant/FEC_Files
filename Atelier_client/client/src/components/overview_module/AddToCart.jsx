import React, { useState, useEffect } from 'react';

function AddToCart (props) {

  const [styleAvail, setStyleAvail] = useState({});
  const [outOfStock, setOutOfStock] = useState(true);
  const [sizeSelected, setSizeSelected] = useState('');
  const [quantities, setQuantities] = useState(0);
  const [quantitySelected, setQuantitySelected] = useState(0)

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
  };

  var handleSizeChange = (e) => {
    // console.log(e.target.value);
    setSizeSelected(e.target.value);
  };

  var handleQuantityChange = (e) => {
    setQuantitySelected(e.target.value);
  }

  useEffect(() => {
    availability(props.style.skus);
  }, [props.style]);

  useEffect(() => {
    var qtys = [];
    var qty = styleAvail[sizeSelected];
    for (var i = 1; i < qty; i++) {
      qtys.push(i+1);
    }
    if (qtys.length > 14) {
      qtys = qtys.slice(0, 14);
    };
    setQuantities(qtys);
  }, [sizeSelected])

  var handleAddToCart = (e) => {
    e.preventDefault();
    if (!outOfStock && sizeSelected !== '' && quantitySelected !== 0) {
    }

    // else if (!outOfStock && sizeSelected === '') {


    // }
  }

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
              : <select onChange={(e) => {
                  handleQuantityChange(e);
                }}>
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

          <button onClick={(e) => {
            handleAddToCart(e);
          }}>Add to Cart</button>


      </div>
    )

  } else {
    return (
      <select>
        <option disabled>OUT OF STOCK</option>
      </select>
    )
  }
}

export default AddToCart;