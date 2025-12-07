/**
 * Update Property
 * PUT /api/properties/{id}/
 */

import axiosInstance from "@/services/xhr";

export async function updateProperty(id, data) {
  const response = await axiosInstance.put(`/properties/${id}/`, data);
  return response.data;
}

