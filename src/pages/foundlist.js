import { useState } from 'react';

export default function FoundItems() {
  // Example found items data
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Black Wallet',
      size: 'Small',
      color: 'Black',
      type: 'Wallet',
      foundPlace: 'Colombo',
      photo: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Red Backpack',
      size: 'Large',
      color: 'Red',
      type: 'Backpack',
      foundPlace: 'Kandy',
      photo: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Blue Umbrella',
      size: 'Medium',
      color: 'Blue',
      type: 'Umbrella',
      foundPlace: 'Galle',
      photo: 'https://via.placeholder.com/150',
    },
  ]);

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Found Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl px-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            {/* <img
              src={item.photo}
              alt={item.name}
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            /> */}
            <img
            src={item.photo || 'https://via.placeholder.com/150'}
            alt={item.name || 'Default Image'}
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
}
