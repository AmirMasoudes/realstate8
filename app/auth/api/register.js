/**
 * User Registration
 * POST /api/auth/register/
 */

import axiosInstance from "@/services/xhr";

export async function register(userData) {
  const response = await axiosInstance.post("/auth/register/", userData);
  
  // Store token if provided
  if (response.data.token && typeof window !== "undefined") {
    localStorage.setItem("auth_token", response.data.token);
  }
  
  return response.data;
}

