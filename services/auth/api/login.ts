/**
 * User Login
 * POST /api/auth/login/
 */

import axiosInstance from "@/services/api/xhr";
import { AxiosResponse } from "axios";

export interface LoginCredentials {
  email: string;
  password: string;
  username?: string;
}

export interface LoginResponse {
  token?: string;
  refresh?: string;
  user?: {
    id: number;
    email: string;
    name: string;
  };
  [key: string]: any;
}

/**
 * Login user
 * @param credentials - User login credentials
 * @returns Login response with token and user data
 */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response: AxiosResponse<LoginResponse> = await axiosInstance.post("/auth/login/", credentials);
  
  // Store token if provided
  if (response.data.token && typeof window !== "undefined") {
    localStorage.setItem("auth_token", response.data.token);
  }
  
  return response.data;
}

