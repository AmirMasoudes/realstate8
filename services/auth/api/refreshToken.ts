/**
 * Refresh Auth Token
 * POST /api/auth/refresh/
 */

import axiosInstance from "@/services/api/xhr";
import { AxiosResponse } from "axios";

export interface RefreshTokenResponse {
  token?: string;
  refresh?: string;
  access?: string;
  [key: string]: any;
}

/**
 * Refresh authentication token
 * @param refreshToken - Refresh token string
 * @returns New token response
 */
export async function refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
  const response: AxiosResponse<RefreshTokenResponse> = await axiosInstance.post("/auth/refresh/", {
    refresh: refreshToken,
  });
  
  // Update token if provided
  if (response.data.token && typeof window !== "undefined") {
    localStorage.setItem("auth_token", response.data.token);
  }
  
  return response.data;
}

