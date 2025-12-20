/**
 * Legacy XHR Wrapper
 * This file provides backward compatibility for imports from "@/services/xhr"
 * All new code should use "@/services/api/xhr" directly
 * 
 * @deprecated Use services/api/xhr.ts instead
 */

import axios from "axios";
import { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios";

// Create axios instance with default configuration (matching old xhr.js behavior)
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor - Add auth token if available
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get auth token from localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle network errors
    if (!error.response) {
      (error as any).response = {
        status: 0,
        data: {
          message: "خطا در اتصال به سرور",
          details: error.message,
        },
      };
    }

    // Handle 401 - Unauthorized
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

