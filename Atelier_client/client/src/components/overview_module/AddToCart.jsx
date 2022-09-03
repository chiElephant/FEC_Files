/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-empty */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';

function AddToCart(props) {
  const [styleAvail, setStyleAvail] = useState({});
  const [outOfStock, setOutOfStock] = useState(true);
  const [sizeSelected, setSizeSelected] = useState('');
  const [quantities, setQuantities] = useState(0);
  const [quantitySelected, setQuantitySelected] = useState(0);

  const availability = async (skus) => {
    const resultObj = {};
    const skusArray = await Object.entries(skus);
    skusArray.forEach((size) => {
      const sizesArray = Object.entries(size[1]);
      resultObj[sizesArray[1][1]] = sizesArray[0][1];
    });
    setStyleAvail(resultObj);

    for (const size in resultObj) {
      if (resultObj[size] > 0) {
        setOutOfStock(false);
      }
    }
  };

  const handleSizeChange = (e) => {
    // console.log(e.target.value);
    setSizeSelected(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantitySelected(e.target.value);
  };

  useEffect(() => {
    availability(props.style.skus);
  }, [props.style]);

  useEffect(() => {
    let qtys = [];
    const qty = styleAvail[sizeSelected];
    for (let i = 1; i < qty; i++) {
      qtys.push(i + 1);
    }
    if (qtys.length > 14) {
      qtys = qtys.slice(0, 14);
    }
    setQuantities(qtys);
  }, [sizeSelected]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!outOfStock && sizeSelected !== '' && quantitySelected !== 0) {
    }

    // else if (!outOfStock && sizeSelected === '') {

    // }
  };

  if (outOfStock === false && Object.keys(styleAvail).length) {
    return (
      <div className="add-to-cart">
        <select
          selected="Select Size"
          onChange={(e) => {
            handleSizeChange(e);
          }}
        >
          <option value="" selected disabled hidden>
            Select Size
          </option>
          {Object.keys(styleAvail).map((size, index) => {
            if (styleAvail[size] !== 0) {
              return (
                <option value={size} key={index}>
                  {size}
                </option>
              );
            }
          })}
        </select>

        {!sizeSelected ? (
          <select disabled>
            <option> - </option>
          </select>
        ) : (
          <select
            onChange={(e) => {
              handleQuantityChange(e);
            }}
          >
            <option selected> 1 </option>
            {quantities.map((num, index) => (
              <option value={num} key={index}>
                {num}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={(e) => {
            handleAddToCart(e);
          }}
        >
          Add to Cart
        </button>
      </div>
    );
  }
  return (
    <select>
      <option disabled>OUT OF STOCK</option>
    </select>
  );
}

export default AddToCart;
