import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Navbar() {
  const router = useRouter();

  // Define the logout function
  const handleLogout = () => {
    Cookies.remove('token'); // Remove token from cookies
    alert('You have been logged out!');
    router.push('/'); // Redirect to the login page
  };

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0 text-white text-2xl font-bold">
            <Link href="/">
              RideSync
            </Link>
          </div>

          {/* Space in the middle */}
          <div className="flex-grow"></div>

          {/* Right side: Search, Bookings, Login, Logout */}
          <div className="flex items-center space-x-4">
            {/* Search Link */}
            <Link href="/search" passHref>
              <span className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Search
              </span>
            </Link>

            {/* Booking Link */}
            <Link href="/booking" passHref>
              <span className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Bookings
              </span>
            </Link>

            {/* Login Link */}
            <Link href="/login" passHref>
              <span className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout} // Call the handleLogout function on click
              className="text-white bg-red-500 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
