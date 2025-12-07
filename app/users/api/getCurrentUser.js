/**
 * Get Current User (Profile)
 * GET /api/users/me/
 */

import axiosInstance from "@/services/xhr";

export async function getCurrentUser() {
  const response = await axiosInstance.get("/users/me/");
  return response.data;
}

