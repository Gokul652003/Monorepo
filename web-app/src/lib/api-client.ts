import paths from "@/config/paths";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL ;
const navigate = useNavigate();

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor 
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if(error.response?.status === 403){
      navigate(paths.auth)
    }
    return Promise.reject(error);
  }
);

export default api;
