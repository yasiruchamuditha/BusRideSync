import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Fetch user details and check authentication
  useEffect(() => {
    const token = Cookies.get('token'); // Retrieve token from cookies
    const name = Cookies.get('name'); // Retrieve name from cookies
    if (!token) {
      alert('Unauthorized! Redirecting to login.');
      router.push('/login'); // Redirect to login if no token
    } else {
      // Simulate fetching user data (replace with a real API call)
      setUser({ name}); // Replace with dynamic user data
    }
  }, [router]);

  // Handle logout
  const handleLogout = () => {
    Cookies.remove('token'); // Remove token from cookies
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
        Welcome Admin, {user ? user.name : 'Loading...'}
      </h2>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {/* Card: Search Bus Schedules */}
        <div
          onClick={() => router.push('/search')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Schedules</h3>
          <p className="text-gray-600">Schedules Management</p>
        </div>

        {/* Card: Book Bus Seats */}
        <div
          onClick={() => router.push('/booking')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Routes</h3>
          <p className="text-gray-600">Routes Management</p>
        </div>

        {/* Card: View Bookings */}
        <div
          onClick={() => router.push('/viewbooking')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Bookings </h3>
          <p className="text-gray-600">Booking Management</p>
        </div>

        {/* Card: Report Lost Items */}
        <div
          onClick={() => router.push('/lost')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Lost Items</h3>
          <p className="text-gray-600">Lost Items Management</p>
        </div>

        {/* Card: Report Found Items */}
        <div
          onClick={() => router.push('/found')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Found Items</h3>
          <p className="text-gray-600">Found Item Management</p>
        </div>

         {/* Card: View Found Item */}
         <div
          onClick={() => router.push('/FoundItems')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Users</h3>
          <p className="text-gray-600">User Management</p>
        </div>
        
         {/* Card: View Lost Item */}
         <div
          onClick={() => router.push('/LostItems')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Bus</h3>
          <p className="text-gray-600">Bus Management</p>
        </div>

        {/* Card: Luggage Booking */}
        <div
          onClick={() => router.push('/luggage')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Luggage</h3>
          <p className="text-gray-600">Luggage Management</p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-8 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
