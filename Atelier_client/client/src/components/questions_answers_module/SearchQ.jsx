import React, { useState, useEffect } from 'react';

function SearchQ(props) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setText(e.target[0].value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Have a question? Search for answers..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchQ;
