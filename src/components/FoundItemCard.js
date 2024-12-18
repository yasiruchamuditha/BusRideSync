// src/components/FoundItemCard.js
import React from 'react';

const FoundItemCard = ({ item }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      {item.photos.length > 0 && <image className="w-full" src={item.photos[0]} alt="Found item" />}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{item.name}</div>
        <p className="text-gray-700 text-base">Found at: {item.foundPlace}</p>
        <p className="text-gray-700 text-base">Color: {item.color}</p>
        <p className="text-gray-700 text-base">Size: {item.size}</p>
        <p className="text-gray-700 text-base">Type: {item.type}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {item.busNumber}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {item.route}
        </span>
      </div>
    </div>
  );
};

export default FoundItemCard;