import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/'); // If no token, redirect to login
    } else {
      // In a real app, you would fetch the user data from the server here.
      setUser({ name: 'John Doe' }); // Mock user data
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-80">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Welcome to the Dashboard
        </h2>
        <p className="mb-4">Hello, {user ? user.name : 'Loading...'}</p>
        <button
          onClick={() => {
            localStorage.removeItem('token'); // Remove the token on logout
            router.push('/'); // Redirect back to login page
          }}
          className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
