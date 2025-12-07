/**
 * Upload Image
 * POST /api/images/upload/
 */

import axiosInstance from "@/services/xhr";

export async function uploadImage(file, propertyId = null) {
  const formData = new FormData();
  formData.append("file", file);
  if (propertyId) {
    formData.append("property_id", propertyId);
  }
  
  const response = await axiosInstance.post("/images/upload/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

