import React from 'react';
import { Search } from '@mui/icons-material';

function SearchQ({ searchText, handleUpdateSearchText }) {
  return (
    <div className="search">
      <div className="searchInputs">
        <input
          value={searchText}
          type="text"
          placeholder="Have a question? Search for answers..."
          onChange={handleUpdateSearchText}
        />
        <div style={{ paddingRight: '10px' }}>
          <Search fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default SearchQ;
