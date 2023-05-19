import React, { useEffect, useState } from 'react';
import { addToCart } from '../../lib/dataHandlers';

const styleType = {
  _id: 0,
  id: 0,
  skus: {},
  photos: [],
  productId: 0,
  name: '',
  sale_price: 0,
  original_price: 0,
  default_style: true,
  lastModified: '',
};

export default function AddToCart({ currentStyle }) {
  const [availability, setAvailability] = useState({});
  const [size, setSize] = useState(null);
  const [qtyNeeded, setQtyNeeded] = useState(0);
  const [isOutOfStock, setIsOutOfStock] = useState(true);
  const [sku, setSku] = useState(null);
  const [qtysAvail, setQtysAvail] = useState([]);
  const [style, setStyle] = useState(styleType);

  // Add item to cart, remove it from quantity in db
  async function handleCart(e) {
    e.preventDefault();
    if (!isOutOfStock && sku && size && qtyNeeded) {
      const res = await addToCart(currentStyle, size, qtyNeeded);
      console.log('Item added to cart');
      setStyle(res);
    } else if (!isOutOfStock && !size) {
      console.log('Please choose a size and quantity');
    }
  }

  // Change the selected size
  function handleSizeChange(e) {
    setSize(e.target.value);
  }

  // Change the selected quantity
  function handleQuantityChange(e) {
    setQtyNeeded(e.target.value);
  }

  // Check availability, set out of stock
  useEffect(() => {
    const sizes = Object.keys(style.skus);

    if (sizes.length === 0) {
      setIsOutOfStock(true);
    } else {
      setIsOutOfStock(false);
      setSize(null);
      setQtyNeeded(0);
      setAvailability(style.skus);
    }
  }, [style]);

  useEffect(() => {
    setStyle(currentStyle);
  }, [currentStyle]);

  // Show sku sizes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const showSizes = () => {
        const drop = document.getElementById('size-dropdown');
        const add = document.getElementById('addto-cart');

        add.addEventListener('mousedown', (event) => {
          setTimeout(() => {
            drop.dispatchEvent(event);
          });
        });
      };

      if (size && !isOutOfStock && !qtyNeeded) {
        showSizes();
      }
    }
  }, [size, isOutOfStock, qtyNeeded]);

  // Get the available quantities for the selected size
  useEffect(() => {
    if (size) {
      const qty = style.skus[size].quantity;
      if (qty) {
        const temp = Array.from({ length: qty }, (_, index) => index + 1);
        setQtysAvail(temp);
      }
    }
  }, [size]);

  // Get the SKU for the selected size
  useEffect(() => {
    if (size) {
      const sizes = Object.keys(style.skus);
      for (let i = 0; i < sizes.length; i++) {
        if (sizes[i].toLowerCase() === size.toLowerCase()) {
          setSku(sizes[i]);
          break;
        }
      }
    }
  }, [size]);

  // The JSX to return
  if (isOutOfStock) {
    return (
      <select>
        <option disabled>OUT OF STOCK</option>
      </select>
    );
  }
  if (!isOutOfStock && Object.keys(availability).length > 0) {
    return (
      <div className="add-to-cart">
        <select
          className="size-dropdown"
          id="size-dropdown"
          value={size || 'Select Size'}
          onChange={handleSizeChange}
        >
          <option value="Select Size" disabled hidden>
            Select Size
          </option>
          {Object.entries(availability).map(([key, value]) => {
            if (value.quantity !== 0) {
              return (
                <option value={key} key={key}>
                  {key}
                </option>
              );
            }
            return null;
          })}
        </select>

        {!style.skus[size] ? (
          <select disabled>
            <option> - </option>
          </select>
        ) : (
          <select onChange={handleQuantityChange}>
            <option value="qty" disabled hidden>
              -
            </option>
            {qtysAvail.map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
        )}

        {size && availability ? (
          <div>{`${availability[size].quantity} availabile`}</div>
        ) : (
          <div>choose your options</div>
        )}

        {!isOutOfStock && (
          <button id="addto-cart" onClick={handleCart}>
            Add to Cart
          </button>
        )}
      </div>
    );
  }
}
