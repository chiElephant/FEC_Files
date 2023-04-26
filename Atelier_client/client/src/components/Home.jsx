import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/products')
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
