// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`, 
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    console.log("Token from local storage: ", token);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;