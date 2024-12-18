// src/pages/LostItems.js
import React, { useEffect, useState } from 'react';
import { getLostItems } from '../services/lostService';
import LostItemCard from '../components/LostItemCard';

const LostItems = () => {
  const [lostItems, setLostItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const items = await getLostItems();
        setLostItems(items);
      } catch (error) {
        setError('Failed to load lost items.'+{error});
      }
    };

    fetchLostItems();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Lost Items</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex flex-wrap justify-center">
        {lostItems.map(item => (
          <LostItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default LostItems;