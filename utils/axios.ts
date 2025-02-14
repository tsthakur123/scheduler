import axios from 'axios';

// You can set your backend API URL here or in .env.local
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
});

// Set JWT token in headers for auth-protected routes
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
