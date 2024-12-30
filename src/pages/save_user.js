// src/pages/admin/RegisterUser.js
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useRouter } from 'next/router';

const RegisterUser = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: generatePassword(),
    role: 'commuter', // Default role
    mobile: '',
  });

  const router = useRouter();

  // Function to generate a random password
  function generatePassword() {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  }

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/auth/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('User registered successfully!');
      router.push('/admin'); // Redirect to admin page after successful registration
    } catch (error) {
      alert('Error registering user. Please try again.');
      console.error('Error:', error);
    }
  };

  // Generate a new password and update the state
  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setFormData({ ...formData, password: newPassword });
  };

  // Copy the generated password to the clipboard
  const handleCopyPassword = () => {
    navigator.clipboard.writeText(formData.password)
      .then(() => {
        alert('Password copied to clipboard!');
      })
      .catch((err) => {
        console.error('Error copying password:', err);
      });
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Register User</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        {/* Password Field with Generate and Copy Buttons */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="flex">
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              readOnly // Make the password field read-only
            />
            <button
              type="button"
              onClick={handleGeneratePassword}
              className="ml-2 py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Generate
            </button>
            <button
              type="button"
              onClick={handleCopyPassword}
              className="ml-2 py-3 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Copy
            </button>
          </div>
        </div>
        {/* Role Field */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="commuter">Commuter</option>
            <option value="operator">Operator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {/* Mobile Field */}
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
          {/* Mobile Field */}
          <div className="mb-4">
          <label htmlFor="nic" className="block text-sm font-medium text-gray-700">NIC</label>
          <input
            type="text"
            id="nic"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Register User
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;