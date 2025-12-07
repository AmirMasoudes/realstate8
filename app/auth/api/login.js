/**
 * User Login
 * POST /api/auth/login/
 */

import axiosInstance from "@/services/xhr";

export async function login(credentials) {
  const response = await axiosInstance.post("/auth/login/", credentials);
  
  // Store token if provided
  if (response.data.token && typeof window !== "undefined") {
    localStorage.setItem("auth_token", response.data.token);
  }
  
  return response.data;
}

