/**
 * Create Property
 * POST /api/properties/
 */

import axiosInstance from "@/services/xhr";

export async function createProperty(data) {
  const response = await axiosInstance.post("/properties/", data);
  return response.data;
}

