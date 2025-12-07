/**
 * Refresh Auth Token
 * POST /api/auth/refresh/
 */

import axiosInstance from "@/services/xhr";

export async function refreshToken(refreshToken) {
  const response = await axiosInstance.post("/auth/refresh/", {
    refresh: refreshToken,
  });
  
  // Update token if provided
  if (response.data.token && typeof window !== "undefined") {
    localStorage.setItem("auth_token", response.data.token);
  }
  
  return response.data;
}

