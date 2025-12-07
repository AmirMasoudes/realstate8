/**
 * User Logout
 * POST /api/auth/logout/
 */

import axiosInstance from "@/services/xhr";

export async function logout() {
  try {
    await axiosInstance.post("/auth/logout/");
  } finally {
    // Always remove token from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  }
  return { success: true };
}

