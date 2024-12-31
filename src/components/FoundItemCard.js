import React from 'react';
import Image from 'next/image';

const FoundItemCard = ({ item }) => {
  const handleContactAdmin = () => {
    // admin's email address
    const adminEmail = 'prcaretest@gmail.com';
    const subject = `Inquiry about found item: ${item.name}`;
    const body = `Hello Admin,\n\nI would like to inquire about the found item with the following details:\n\nName: ${item.name}\nFound at: ${item.foundPlace}\nColor: ${item.color}\nSize: ${item.size}\nType: ${item.type}\nBus Number: ${item.busNumber}\nRoute: ${item.route}\n\nThank you.`;
    window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      {item.photos.length > 0 && <Image className="w-full" src={item.photos[0]} alt="Found item" />}
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
        <button
          onClick={handleContactAdmin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Contact Admin
        </button>
      </div>
    </div>
  );
};

export default FoundItemCard;