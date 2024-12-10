import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//import Cookies from 'js-cookie';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Fetch user details and check authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized! Redirecting to login.');
      router.push('/'); // Redirect to login if no token
    } else {
      // Simulate fetching user data (replace with real API call)
      setUser({ name: 'John Doe' });
    }
  }, [router]);

  // // Handle logout
  // const handleLogout = () => {
  //   Cookies.remove('token'); // Remove token from cookies
  //   router.push('/'); // Redirect to the login page
  // };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-semibold mb-6">Welcome, {user ? user.name : 'Loading...'}</h2>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {/* Card: Search the Bus */}
        <div
          onClick={() => router.push('/search')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Search the Bus Schedules</h3>
          <p className="text-gray-600">Search available bus routes and schedules for your journey.</p>
        </div>

        {/* Card: Book the Bus */}
        <div
          onClick={() => router.push('/booking')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Book the Bus Seats</h3>
          <p className="text-gray-600">Reserve your seats and make secure payments for your trip.</p>
        </div>

        {/* Card: View the Booking */}
        <div
          onClick={() => router.push('/viewbooking')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">View the Booking</h3>
          <p className="text-gray-600">Check your upcoming and past bookings in one place.</p>
        </div>

        {/* Card: Lost Feature */}
        <div
          onClick={() => router.push('/lost')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Report a Lost Item</h3>
          <p className="text-gray-600">Report and search for lost items during your bus journey.</p>
        </div>

        {/* Card: Found Feature */}
        <div
          onClick={() => router.push('/found')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Report a Found Item</h3>
          <p className="text-gray-600">Submit found items to help reunite them with their owners.</p>
        </div>
      
        {/* Card: Lagguage Feature */}
        <div
          onClick={() => router.push('/lagguage')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Lagguage Booking</h3>
          <p className="text-gray-600">Reserve your Lagguage and make secure payments for your trip.</p>
        </div>

               {/* Card: Lost Feature */}
               <div
          onClick={() => router.push('/viewlagguage')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">View Lagguage Booking</h3>
          <p className="text-gray-600">Check your upcoming and past Lagguage bookings in one place.</p>
        </div>

        {/* Card: Found Feature */}
        <div
          onClick={() => router.push('/foundlist')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">List Found Items</h3>
          <p className="text-gray-600">Submit found items to help reunite them with their owners.</p>
        </div>
      
        {/* Card: Lagguage Feature */}
        <div
          onClick={() => router.push('/updateprofile')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-xl font-bold text-green-600 mb-4">Profile Settings</h3>
          <p className="text-gray-600">Make the your profile changes.</p>
        </div>
      </div>

      {/* Logout Button */}
      {/* <button
        onClick={handleLogout}
        className="mt-8 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button> */}
    </div>
  );
}
