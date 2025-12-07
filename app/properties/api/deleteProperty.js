/**
 * Delete Property
 * DELETE /api/properties/{id}/
 */

import axiosInstance from "@/services/xhr";

export async function deleteProperty(id) {
  const response = await axiosInstance.delete(`/properties/${id}/`);
  return response.data;
}

