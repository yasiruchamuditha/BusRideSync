import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../services/auth';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Handle the login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login({ email, password });
    if (response.token) {
      localStorage.setItem('token', response.token); // Save token
      alert('Login successful!');
      router.push('/dashboard'); // Redirect to the dashboard or home page after login
    } else {
      alert(response.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-300 via-green-400 to-green-500">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Sign In
        </button>
        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-green-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
