/**
 * Partial Update Property
 * PATCH /api/properties/{id}/
 */

import axiosInstance from "@/services/xhr";

export async function patchProperty(id, data) {
  const response = await axiosInstance.patch(`/properties/${id}/`, data);
  return response.data;
}

