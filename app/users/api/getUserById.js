/**
 * Get User by ID
 * GET /api/users/{id}/
 */

import axiosInstance from "@/services/xhr";

export async function getUserById(id) {
  const response = await axiosInstance.get(`/users/${id}/`);
  return response.data;
}

