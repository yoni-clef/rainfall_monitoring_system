import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  login: async (email, password) => {
    console.log("hi am in api page")
    const response = await api.post('/auth/login', { email, password });
    console.log(response)
    return response.data;
  },
  
  signup: async (name, email, password) => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
  },
};

// Rain data API calls
export const rainAPI = {
  getHistory: async () => {
    const response = await api.get('/rain/history');
    return response.data;
  },
  
  addReading: async (level, valve_status) => {
    const response = await api.post('/rain', { level, valve_status });
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/rain/profile');
    return response.data;
  },
};

export default api; 