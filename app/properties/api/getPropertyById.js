/**
 * Get Property by ID
 * GET /api/properties/{id}/
 */

import axiosInstance from "@/services/xhr";

export async function getPropertyById(id) {
  const response = await axiosInstance.get(`/properties/${id}/`);
  return response.data;
}

