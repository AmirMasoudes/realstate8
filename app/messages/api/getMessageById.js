/**
 * Get Message by ID
 * GET /api/messages/{id}/
 */

import axiosInstance from "@/services/xhr";

export async function getMessageById(id) {
  const response = await axiosInstance.get(`/messages/${id}/`);
  return response.data;
}

