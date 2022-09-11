import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

export default function ProductLinks({ products, handleSelectProduct }) {
  // console.log(products);
  return (
    <nav>
      <h3>Products</h3>
      <ul>
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/${product.id}`}
            // onClick={(e) => handleSelectProduct(e, product.id)}
          >
            <div>Product Name: {product.name}</div>
            <div>Product id: {product.id}</div>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
