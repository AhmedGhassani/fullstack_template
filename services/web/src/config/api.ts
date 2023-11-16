import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost/api';

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
});

export { api };
