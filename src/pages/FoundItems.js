//src/pages/FoundItems.js
import React, { useEffect, useState } from 'react';
import { getFoundItems } from '../services/foundService';
import FoundItemCard from '../components/FoundItemCard';

const FoundItems = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const items = await getFoundItems();
        setFoundItems(items);
      } catch (error) {
        setError('Failed to load found items.'+{error});
      }
    };

    fetchFoundItems();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8" style={{ height: '1000px' }}>
      <h1 className="text-3xl font-bold text-center mb-8">Found Items</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex flex-wrap justify-center">
        {foundItems.map(item => (
          <FoundItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FoundItems;