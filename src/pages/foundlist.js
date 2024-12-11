import { useState } from 'react';
import Image from 'next/image';

const FoundList = () => {
  const [items] = useState([
    // Example items data
    {
      id: 1,
      photo: 'https://example.com/photo1.jpg',
      name: 'Item 1',
      size: 'Medium',
      color: 'Red',
      type: 'Clothing',
      foundPlace: 'Park'
    },
    {
      id: 2,
      photo: 'https://example.com/photo2.jpg',
      name: 'Item 2',
      size: 'Large',
      color: 'Blue',
      type: 'Accessory',
      foundPlace: 'Mall'
    },
    // Add more items as needed
  ]);

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Found Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl px-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            <Image
              src={item.photo || 'https://via.placeholder.com/150'}
              alt={item.name || 'Default Image'}
              width={600}
              height={240}
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-bold text-green-600 mb-2">{item.name}</h3>
            <p className="text-gray-600">Size: {item.size}</p>
            <p className="text-gray-600">Color: {item.color}</p>
            <p className="text-gray-600">Type: {item.type}</p>
            <p className="text-gray-600">Found Place: {item.foundPlace}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoundList;
