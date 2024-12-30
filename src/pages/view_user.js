// src/pages/admin/Users.js
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

// const BASE_URL = 'http://localhost:5000/api/admin/users'; 

const Users = () => {
  const [commuters, setCommuters] = useState([]);
  const [operators, setOperators] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch users by role
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`/admin/users`);
        const users = response.data;
        setCommuters(users.filter(user => user.role === 'commuter'));
        setOperators(users.filter(user => user.role === 'operator'));
        setAdmins(users.filter(user => user.role === 'admin'));
      } catch (error) {
        console.error('Error fetching users:', error);
        if (error.response) {
          console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          console.error('Network error: No response received from the server.');
        } else {
          console.error('Error setting up the request:', error.message);
        }
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token
      console.log('Deleting user with ID:', userId);
      console.log('Using token:', token);

      await axiosInstance.delete(`/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCommuters(commuters.filter(user => user._id !== userId));
      setOperators(operators.filter(user => user._id !== userId));
      setAdmins(admins.filter(user => user._id !== userId));
      alert('User deleted successfully.');
    } catch (error) {
      console.error('Error deleting user:', error);
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


  const handleUpdate = (userId) => {
    alert('Update feature is under development'+userId);
  };

  const renderTable = (users, role) => (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-green-700 mb-4">{role} Users</h3>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Mobile</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.mobile}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleUpdate(user._id)}
                  className="mr-2 py-1 px-3 bg-blue-500 text-white rounded-lg"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="py-1 px-3 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Manage Users</h2>
      <div className="w-full max-w-6xl">
        {renderTable(commuters, 'Commuter')}
        {renderTable(operators, 'Operator')}
        {renderTable(admins, 'Admin')}
      </div>
    </div>
  );
};

export default Users;