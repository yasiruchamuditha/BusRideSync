import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Import useRouter hook

const BASE_URL = 'http://localhost:5000/api/found';

export default function ReportFoundItem() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    busNumber: '',
    route: '',
    foundPlace: '',
    size: '',
    color: '',
    type: '',
    note: '',
    photos: []
  });

  const router = useRouter(); // Initialize useRouter hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photos: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Append all fields to FormData
      Object.keys(formData).forEach(key => {
        if (key === 'photos') {
          formData.photos.forEach(photo => formDataToSend.append('photos', photo));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      console.log('Sending request to:', BASE_URL);
      console.log('FormData:', formDataToSend);

      // Send formData using axios
      const response = await axios.post(BASE_URL, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Found item report submitted successfully!');
      console.log(response.data);

      // Redirect to the index page after successful submission
      router.push('/home'); // Redirect to the home page
    } catch (error) {
      if (error.message === 'Network Error') {
        alert('Failed to connect to the server. Please check your internet connection and try again.');
      } else {
        alert('Failed to submit the report. Please try again.');
      }
      console.error('Error submitting the report:', error);
      // Redirect to the home page after not successful submission
      router.push('/home'); // Redirect to the home page
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Report Found Item</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        {/* Form fields as shown in the initial code */}
        {/* Personal Details */}
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

        <div className="mb-4">
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

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

        {/* Bus Details */}
        <div className="mb-4">
          <label htmlFor="busNumber" className="block text-sm font-medium text-gray-700">Bus Number</label>
          <input
            type="text"
            id="busNumber"
            name="busNumber"
            value={formData.busNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="route" className="block text-sm font-medium text-gray-700">Route</label>
          <input
            type="text"
            id="route"
            name="route"
            value={formData.route}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="foundPlace" className="block text-sm font-medium text-gray-700">Found Place (Nearest City)</label>
          <input
            type="text"
            id="foundPlace"
            name="foundPlace"
            value={formData.foundPlace}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Found Item Details */}
        <div className="mb-4">
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">Item Size</label>
          <input
            type="text"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">Item Color</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Item Type</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="photos" className="block text-sm font-medium text-gray-700">Upload Photos (optional)</label>
          <input
            type="file"
            id="photos"
            name="photos"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="mt-2">
            {formData.photos.length > 0 && formData.photos.map((file, index) => (
              <p key={index} className="text-sm text-gray-500">{file.name}</p>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mb-4">
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">Additional Note</label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}