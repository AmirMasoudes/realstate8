/**
 * Get Properties List
 * GET /api/properties/
 */

import axiosInstance from "@/services/xhr";

export async function getProperties(params = {}) {
  const response = await axiosInstance.get("/properties/", { params });
  return response.data;
}

