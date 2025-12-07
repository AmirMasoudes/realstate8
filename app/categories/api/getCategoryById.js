/**
 * Get Category by ID
 * GET /api/categories/{id}/
 */

import axiosInstance from "@/services/xhr";

export async function getCategoryById(id) {
  const response = await axiosInstance.get(`/categories/${id}/`);
  return response.data;
}

