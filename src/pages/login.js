import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../services/auth';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      if (response.token) {
        Cookies.set('token', response.token, { expires: 1 }); // Save token in cookies for 60 minutes
        Cookies.set('name', response.user.name); // Save name in cookies 
        Cookies.set('role', response.user.role); // Save role in cookies
        Cookies.set('email', response.user.email); // Save email in cookies
        Cookies.set('id', response.user.id); // Save id in cookies
        localStorage.setItem('accessToken', response.token); // Save token in local storage
        localStorage.setItem('refreshToken', response.refreshToken); // Save refresh token in local storage
        localStorage.setItem('role', response.user.role); // Save role in local storage
        localStorage.setItem('id', response.user.id); // Save id in local storage
        console.log('Login successful:', response);
        alert('Login successful!');

        console.log('response',response);
        console.log('response.user',response.user);
        console.log('response.user.role',response.user.role);
        console.log('response.user.id',response.user.id);
        console.log('response.user.email',response.user.email);
        console.log('response.user.name',response.user.name);
        console.log('response.token',response.token);
        console.log('response.refreshToken',response.refreshToken);
        


        // Redirect based on role
        if (response.user.role === 'admin') {
          router.push('/admin'); // Redirect to admin panel
        } else if (response.user.role === 'operator') {
          router.push('/operator'); // Redirect to operator panel
        } else {
          router.push('/home'); // Default redirect to home page
        }
      } else {
        setError(response.message || 'Login failed');
        alert(response.message || 'Login failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Incorrect email or password. Please try again.');
      } else if (error.response && error.response.status === 404) {
        setError('Endpoint not found. Please check the URL.');
      } else if (error instanceof TypeError) {
        setError('Failed to connect to the server. Please check your internet connection and try again.');
      } else {
        setError('Failed to connect to the server. Please try again later.');
      }
      console.error('Login error:', error);
      // Redirect back to the login page after displaying the error
      router.push('/login');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-300 via-green-400 to-green-500">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Display error message */}
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