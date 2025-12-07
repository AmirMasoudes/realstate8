/**
 * Centralized Axios Instance
 * All API requests must go through this module
 * Base URL: http://localhost:8000/api/
 */

import axios from "axios";

// Create axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor - Add auth token if available
axiosInstance.interceptors.request.use(
  (config) => {
    // Get auth token from localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      error.response = {
        status: 0,
        data: {
          message: "خطا در اتصال به سرور",
          details: error.message,
        },
      };
    }

    // Handle 401 - Unauthorized
    if (error.response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        // Optionally redirect to login
        // window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

