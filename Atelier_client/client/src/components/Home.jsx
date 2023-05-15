import React from 'react';
import Products from './Products.jsx';
import Topbar from './Topbar.jsx';

function Home() {
  return (
    <div className="home-container">
      <Topbar />
      <Products />
    </div>
  );
}

export default Home;
