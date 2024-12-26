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
      setUser({ name }); // Replace with dynamic user data
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

      {/* Main Cards */}
      <div className="w-full max-w-6xl px-4">
        {/* Card: Schedules */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer mb-8">
          <h3 className="text-xl font-bold text-green-600 mb-4">Schedules Management</h3>
          <div className="mt-4">
            <p className="text-gray-600">
              Manage bus schedules efficiently.
            </p>
            <button
              onClick={() => router.push('/save_schedule')}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Schedule
            </button>
            <button
              onClick={() => router.push('/view_schedules')}
              className="mt-4 ml-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              View Schedules
            </button>
          </div>
        </div>

        {/* Card: Routes */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer mb-8">
          <h3 className="text-xl font-bold text-green-600 mb-4">Routes Management</h3>
          <div className="mt-4">
            <p className="text-gray-600">
              Manage bus routes effectively.
            </p>
            <button
              onClick={() => router.push('/save_route')}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Route
            </button>
            <button
              onClick={() => router.push('/view_routes')}
              className="mt-4 ml-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              View Routes
            </button>
          </div>
        </div>

        {/* Card: Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer mb-8">
          <h3 className="text-xl font-bold text-green-600 mb-4">Bookings Management</h3>
          <div className="mt-4">
            <p className="text-gray-600">
              Manage bus bookings seamlessly.
            </p>
            <button
              onClick={() => router.push('/viewbooking')}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              View Bookings
            </button>
          </div>
        </div>

        {/* Card: Lost Items */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer mb-8">
          <h3 className="text-xl font-bold text-green-600 mb-4">Lost Items Management</h3>
          <div className="mt-4">
            <p className="text-gray-600">
              Report and manage lost items.
            </p>
            <button
              onClick={() => router.push('/lost')}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              View Lost Items
            </button>
            <button
              onClick={() => router.push('/view_lost')}
              className="mt-4 ml-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              View Lost
            </button>
          </div>
        </div>

        {/* Card: Found Items */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer mb-8">
          <h3 className="text-xl font-bold text-green-600 mb-4">Found Items Management</h3>
          <div className="mt-4">
            <p className="text-gray-600">
              Report and manage found items.
            </p>
            <button
              onClick={() => router.push('/found')}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              View Found Items
            </button>
            <button
              onClick={() => router.push('/view_found')}
              className="mt-4 ml-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              View Found
            </button>
          </div>
        </div>

        {/* Card: Users */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer mb-8">
          <h3 className="text-xl font-bold text-green-600 mb-4">Users Management</h3>
          <div className="mt-4">
            <p className="text-gray-600">
              Manage user accounts and permissions.
            </p>
            <button
              onClick={() => router.push('/users')}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              View Users
            </button>
          </div>
        </div>

        {/* Card: Bus */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer mb-8">
          <h3 className="text-xl font-bold text-green-600 mb-4">Bus Management</h3>
          <div className="mt-4">
            <p className="text-gray-600">
              Manage bus details and schedules.
            </p>
            <button
              onClick={() => router.push('/save_bus')}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Bus
            </button>
            <button
              onClick={() => router.push('/view_buses')}
              className="mt-4 ml-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              View Buses
            </button>
          </div>
        </div>

        {/* Card: Luggage */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer mb-8">
          <h3 className="text-xl font-bold text-green-600 mb-4">Luggage Management</h3>
          <div className="mt-4">
            <p className="text-gray-600">
              Manage luggage bookings and details.
            </p>
            <button
              onClick={() => router.push('/update_bus')}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              View Luggage
            </button>
          </div>
        </div>

        {/* Long Card Below Main Cards */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer mb-8">
          <h3 className="text-xl font-bold text-green-600 mb-4">Reports</h3>
          <div className="mt-4">
            <p className="text-gray-600">
              Access detailed reports and analytics to monitor and improve operations.
            </p>
            <button
              onClick={() => router.push('/reports')}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              View Reports
            </button>
          </div>
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