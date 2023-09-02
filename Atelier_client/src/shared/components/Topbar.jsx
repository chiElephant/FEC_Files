import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
// import { Link } from 'react-router-dom';

function Topbar() {
  return (
    <div className="topbar">
      {/* <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <MenuIcon className="menu-icon" />
      </Link> */}
      <div className="atelier">ATELIER</div>
      <div className="search-cart">
        <SearchIcon className="search-icon" />
        <ShoppingCartIcon />
      </div>
    </div>
  );
}

export default Topbar;
