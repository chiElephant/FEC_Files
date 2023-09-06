import React from 'react';
import Product from './Product.jsx';

function RelatedProducts({ relatedProducts, resetProductData }) {
  return (
    <div className="product-list">
      {relatedProducts.map((item) => (
        <Product key={item.id} {...item} resetProductData={resetProductData} />
      ))}
    </div>
  );
}

export default RelatedProducts;
