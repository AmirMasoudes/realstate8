/**
 * Get Categories List
 * GET /api/categories/
 */

import axiosInstance from "@/services/xhr";

export async function getCategories(params = {}) {
  const response = await axiosInstance.get("/categories/", { params });
  return response.data;
}

