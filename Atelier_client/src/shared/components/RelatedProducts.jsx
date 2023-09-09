import React from 'react';
import Product from './Product.jsx';

function RelatedProducts({ relatedProducts, resetProductData }) {
  return (
    <div style={{ width: '1000px' }}>
      <h3>RELATED PRODUCTS</h3>
      <div className="product-list">
        {relatedProducts.map((item) => (
          <Product
            key={item.id}
            {...item}
            resetProductData={resetProductData}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
