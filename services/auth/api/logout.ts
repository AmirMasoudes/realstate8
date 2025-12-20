/**
 * User Logout
 * POST /api/auth/logout/
 */

import axiosInstance from "@/services/api/xhr";

export interface LogoutResponse {
  success: boolean;
  message?: string;
}

/**
 * Logout user
 * @returns Logout response
 */
export async function logout(): Promise<LogoutResponse> {
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

