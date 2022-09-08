import React, { useState, useEffect } from 'react';
import createCharsDiv from './helper_functions/product_bd';

function ProductBreakdown({ characteristics }) {

  const [divElement, setDivElement] = useState(<div />);

  useEffect(() => {
    const div = createCharsDiv(characteristics);
    setDivElement(div);
  }, [characteristics]);

  return (
    <div>
      <h3 hidden>Product Breakdown</h3>
      <div id="char-div">{divElement}</div>
    </div>
  );
}

export default ProductBreakdown;
