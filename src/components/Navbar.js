import Link from 'next/link';

export default function Navbar() {
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

          {/* Right side: Login, Search */}
          <div className="flex items-center space-x-4">
            {/* Search Link */}
            <Link href="/search" passHref>
              <span className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Search
              </span>
            </Link>

              {/* Booking Button */}
              <Link href="/booking" passHref>
              <span className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Bookings
              </span>
             </Link>

            {/* Login Button */}
            <Link href="/login" passHref>
              <span className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
