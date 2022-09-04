import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchQ({ questionList }) {
  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Have a question? Search for answers..."
        />
        <FontAwesomeIcon icon={faSearch} className="searchInputs" />
      </div>
      <div className="dataResult" />
    </div>
  );
}

export default SearchQ;
