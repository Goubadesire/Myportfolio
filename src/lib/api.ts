import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', // <--- Ajouté pour forcer Laravel à répondre en JSON
    },
});

// Injecter le token JWT / Sanctum dans toutes les requêtes si disponible
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;