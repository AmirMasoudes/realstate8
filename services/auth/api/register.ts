/**
 * User Registration
 * POST /api/auth/register/
 */

import axiosInstance from "@/services/api/xhr";
import { AxiosResponse } from "axios";

export interface RegisterData {
  email: string;
  password: string;
  username?: string;
  name?: string;
  phone?: string;
  [key: string]: any;
}

export interface RegisterResponse {
  token?: string;
  refresh?: string;
  user?: {
    id: number;
    email: string;
    name: string;
  };
  message?: string;
  [key: string]: any;
}

/**
 * Register new user
 * @param userData - User registration data
 * @returns Registration response with token and user data
 */
export async function register(userData: RegisterData): Promise<RegisterResponse> {
  const response: AxiosResponse<RegisterResponse> = await axiosInstance.post("/auth/register/", userData);
  
  // Store token if provided
  if (response.data.token && typeof window !== "undefined") {
    localStorage.setItem("auth_token", response.data.token);
  }
  
  return response.data;
}

