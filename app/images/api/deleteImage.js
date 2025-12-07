/**
 * Delete Image
 * DELETE /api/images/{id}/
 */

import axiosInstance from "@/services/xhr";

export async function deleteImage(id) {
  const response = await axiosInstance.delete(`/images/${id}/`);
  return response.data;
}

