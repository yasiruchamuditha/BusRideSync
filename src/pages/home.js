import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Fetch user details and check authentication
  useEffect(() => {
    const token = Cookies.get('token'); // Retrieve token from cookies
    if (!token) {
      alert('Unauthorized! Redirecting to login.');
      router.push('/'); // Redirect to login if no token
    } else {
      // Simulate fetching user data (replace with a real API call)
      setUser({ name: 'John Doe' }); // Replace with dynamic user data
    }
  }, [router]);

  // Handle logout
  const handleLogout = () => {
    Cookies.remove('token'); // Remove token from cookies
    router.push('/'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
        Welcome, {user ? user.name : 'Loading...'}
      </h2>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {/* Card: Search Bus Schedules */}
        <div
          onClick={() => router.push('/search')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Search Bus Schedules</h3>
          <p className="text-gray-600">Find bus routes and schedules for your journey.</p>
        </div>

        {/* Card: Book Bus Seats */}
        <div
          onClick={() => router.push('/booking')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Book Bus Seats</h3>
          <p className="text-gray-600">Reserve your seats and make secure payments for your trip.</p>
        </div>

        {/* Card: View Bookings */}
        <div
          onClick={() => router.push('/viewbooking')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">View Bookings</h3>
          <p className="text-gray-600">Check your upcoming and past bookings in one place.</p>
        </div>

        {/* Card: Report Lost Items */}
        <div
          onClick={() => router.push('/lost')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Report Lost Items</h3>
          <p className="text-gray-600">Report items lost during your bus journey.</p>
        </div>

        {/* Card: Submit Found Items */}
        <div
          onClick={() => router.push('/found')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Submit Found Items</h3>
          <p className="text-gray-600">Help reunite lost items with their owners.</p>
        </div>

        {/* Card: Luggage Booking */}
        <div
          onClick={() => router.push('/luggage')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Luggage Booking</h3>
          <p className="text-gray-600">Reserve and manage luggage for your journey.</p>
        </div>

        {/* Card: View Luggage Booking */}
        <div
          onClick={() => router.push('/viewluggage')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">View Luggage Bookings</h3>
          <p className="text-gray-600">Check all your luggage reservations in one place.</p>
        </div>

        {/* Card: Seasonal Tours */}
        <div
          onClick={() => router.push('/seasonaltours')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Seasonal Tours</h3>
          <p className="text-gray-600">Reserve special seasonal tours with ease.</p>
        </div>

        {/* Card: Profile Settings */}
        <div
          onClick={() => router.push('/profile')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Profile Settings</h3>
          <p className="text-gray-600">Update your personal profile and preferences.</p>
        </div>

        
        {/* Card: Profile Settings */}
        <div
          onClick={() => router.push('/SeatLayout')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Seat Layout</h3>
          <p className="text-gray-600">Seat Layout.</p>
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
