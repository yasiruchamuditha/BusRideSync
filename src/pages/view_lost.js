import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const BASE_URL = 'http://localhost:5000/api/lost'; // Replace with your actual backend URL

export default function ViewLostItems() {
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    // Fetch the list of lost items
    axiosInstance.get(BASE_URL)
      .then(response => {
        setLostItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching lost items:', error);
        if (error.response) {
          // The request was made, but the server responded with a status code outside the 2xx range
          alert(`Error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          // The request was made but no response was received
          alert('Network error: No response received from the server.');
        } else {
          // Something happened in setting up the request
          alert('Error setting up the request.');
        }
      });
  }, []);

const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token
    console.log('Deleting item with ID:', id);
    console.log('Using token:', token);

    await axiosInstance.delete(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setLostItems(lostItems.filter(item => item._id !== id));
    alert('Item deleted successfully.');
  } catch (error) {
    console.error('Error deleting item:', error);
    if (error.response) {
      alert(`Error: ${error.response.status} - ${error.response.statusText}`);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      alert('Network error: No response received from the server.');
      console.error('Request details:', error.request);
    } else {
      alert('Error setting up the request.');
      console.error('Error message:', error.message);
    }
  }
};

  const handleUpdateStatus = async (id) => {
    try {
      await axiosInstance.put(`${BASE_URL}/${id}`, { status: 'found' });
      setLostItems(lostItems.map(item => item._id === id ? { ...item, status: 'found' } : item));
      alert('Item status updated to found.');
    } catch (error) {
      console.error('Error updating item status:', error);
      if (error.response) {
        alert(`Error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        alert('Network error: No response received from the server.');
      } else {
        alert('Error setting up the request.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">View Lost Items</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full overflow-x-auto">
        <table className="min-w-full bg-white border-collapse w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-300">Name</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Contact</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Bus Number</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Route</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Lost Place</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Color</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Type</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Status</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Created At</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {lostItems.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2 border-b border-gray-300">{item.name}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.contact}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.busNumber}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.route}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.lostPlace}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.color}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.type}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.status}</td>
                <td className="px-4 py-2 border-b border-gray-300">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <button
                    onClick={() => handleUpdateStatus(item._id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                  >
                    Mark as Found
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}