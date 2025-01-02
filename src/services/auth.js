//src/services/auth.js
import axiosInstance from '../utils/axiosInstance';

//Handle signup  requests
export const signup = async (userData) => {
  try{
    const response = await axiosInstance.post('/api/auth/signup', userData);
    return response.data;

  }
  catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: "An unexpected error occurred" };
    }
  }
  
};

//Handle login requests
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', credentials);
    // Store tokens and role in local storage
    const data = response.data;

    // Store token and role in local storage
    localStorage.setItem('accessToken', data.token);
    localStorage.setItem('role', data.role); // Store role
    localStorage.setItem('id', data.id); // Store id
    
  return response.data;
  }
  catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: "An unexpected error occurred" };
    }
  }
};





// const AUTH_URL = 'http://localhost:5000/api/auth'; // Ensure this points to your backend

// // const AUTH_URL = process.env.development.NEXT_PUBLIC_AUTH_URL;

// // Signup function
// export const signup = async (userData) => {
//   try {
//     console.log('autl url ',AUTH_URL);
//     const response = await fetch(`${AUTH_URL}/signup`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Failed to fetch during signup:', error);
//     throw error;
//   }
// };

// // Login function
// export const login = async (credentials) => {
//   try {
//     const response = await fetch(`${AUTH_URL}/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(credentials),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();

//     // Store tokens and role in local storage
//     localStorage.setItem('accessToken', data.token);
//     localStorage.setItem('refreshToken', data.refreshToken);
//     console.log('data',data);
//     console.log('data.refreshToken',data.refreshToken);
//     console.log('data.accessToken',data.token); 
//     localStorage.setItem('role', data.role); // Store role

//     return data;
//   } catch (error) {
//     console.error('Failed to fetch during login:', error);
//     throw error;
//   }
// };

