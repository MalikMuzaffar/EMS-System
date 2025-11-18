// src/api/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Always attach token before every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // same key you use at login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
