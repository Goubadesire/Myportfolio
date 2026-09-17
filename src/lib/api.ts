import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api', // L'URL de ton serveur NestJS
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Injecter le token JWT dans toutes les requêtes si disponible
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;