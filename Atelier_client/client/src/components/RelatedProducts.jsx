import React from 'react';
import Product from './Product.jsx';

function RelatedProducts({ relatedProducts }) {
  const productElements = relatedProducts.map((item) => (
    <Product key={item.id} {...item} />
  ));

  return (
    <div id="QandA-main">
      <h1 id="qanda-header">Related Products</h1>
      <div className="product-list-product-page">{productElements}</div>
    </div>
  );
}

export default RelatedProducts;
