/**
 * Search Properties
 * GET /api/properties/search/
 */

import axiosInstance from "@/services/xhr";

export async function searchProperties(params = {}) {
  const response = await axiosInstance.get("/properties/search/", { params });
  return response.data;
}

