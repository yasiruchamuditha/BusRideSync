// pages/FoundItems.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoundItemCard from '../components/FoundItemCard';

const BASE_URL = 'http://localhost:5000/api/found';

const FoundItems = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const token = 'your_bearer_token_here'; // Replace with your actual token
        const response = await axios.get(BASE_URL, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Bearer token to the headers
          },
        });
        setFoundItems(response.data);
      } catch (error) {
        console.error('Error fetching found items:', error);
        setError(error);
      }
    };

    fetchFoundItems();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Found Items</h1>
      {error && <p className="text-red-500 text-center">Failed to load found items.</p>}
      <div className="flex flex-wrap justify-center">
        {foundItems.map((item) => (
          <FoundItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FoundItems;