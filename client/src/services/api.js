import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach Bearer token if saved in localStorage (backup to HTTP-only cookie)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('can_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle global auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 unauthorized and user was logged in, clean up token
    if (error.response && error.response.status === 401) {
      if (localStorage.getItem('can_auth_token')) {
        localStorage.removeItem('can_auth_token');
      }
    }
    return Promise.reject(error);
  }
);

export default api;

