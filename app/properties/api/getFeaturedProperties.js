/**
 * Get Featured Properties
 * GET /api/properties/featured/
 */

import axiosInstance from "@/services/xhr";

export async function getFeaturedProperties(params = {}) {
  const response = await axiosInstance.get("/properties/featured/", { params });
  return response.data;
}

