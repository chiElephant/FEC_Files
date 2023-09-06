import React from 'react';
import { Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Topbar() {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    window.__INITIAL_DATA__ = null;
    navigate('/');
  };

  return (
    <div className="topbar">
      <button
        className="menu-icon"
        tabIndex={0}
        onClick={handleMenuClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleMenuClick();
          }
        }}
        aria-label="Open Menu"
      >
        Products
      </button>

      <div className="atelier">Red Bean Shop</div>
    </div>
  );
}

export default Topbar;
