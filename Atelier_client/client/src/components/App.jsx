
import React, { useState, useEffect } from 'react';
import Overview from './Overview.jsx';

function App (props) {

  const [product_id, setProduct_id] = useState(71697);

  return (
    <div>
      <h1> The RedBean Atelier App </h1>
      <Overview product_id={product_id} />
    </div>
  )

}

export default App;