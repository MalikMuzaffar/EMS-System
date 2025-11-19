import axios from "axios";

const axiosPython = axios.create({
  baseURL: import.meta.env.VITE_PYTHON_API_URL, // Python FastAPI backend
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosPython;
