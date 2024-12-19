import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../services/auth';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      if (response.token) {
        Cookies.set('token', response.token, { expires: 1 }); // Save token in cookies
        localStorage.setItem('accessToken', response.token); // Save token in local storage
        localStorage.setItem('refreshToken', response.refreshToken); // Save refresh token in local storage
        alert('Login successful!');
        router.push('/home'); // Redirect to home page
      } else {
        alert(response.message || 'Login failed');
        router.push('/login'); // Redirect to login page
      }
    } catch (error) {
      if (error instanceof TypeError) {
        alert('Failed to connect to the server. Please check your internet connection and try again.');
      } else {
        alert('Failed to connect to the server. Please try again later.');
      }
      console.error('Login error:', error);
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
