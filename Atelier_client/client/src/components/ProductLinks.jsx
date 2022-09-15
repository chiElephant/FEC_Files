import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductLinks({ products }) {
  return (
    <nav>
      <h3>Products</h3>
      <ul>
        {products.map((product) => (
          <Link key={product.id} to={`/${product.id}`}>
            <div>Product Name: {product.name}</div>
            <div>Product id: {product.id}</div>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
