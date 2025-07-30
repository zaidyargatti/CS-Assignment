import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

// Automatically add token from localStorage to headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
