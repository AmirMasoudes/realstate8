/**
 * Update User
 * PUT /api/users/{id}/
 */

import axiosInstance from "@/services/xhr";

export async function updateUser(id, data) {
  const response = await axiosInstance.put(`/users/${id}/`, data);
  return response.data;
}

