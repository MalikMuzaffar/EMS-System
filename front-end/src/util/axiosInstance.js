// src/api/axiosConfig.js
import axios from "axios";



///////////////////////

// import axios from "axios";

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// export default instance;


// Create an Axios instance using VITE_API_URL from environment
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // fallback for local dev
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token to every request automatically
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // token saved on login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Optional: response interceptor to handle errors globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log network or server errors
    if (!error.response) {
      console.error("Network or CORS error:", error);
    } else {
      console.error("Backend error:", error.response.status, error.response.data);
    }
    return Promise.reject(error);
  }
);

export default instance;

