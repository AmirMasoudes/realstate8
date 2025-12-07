/**
 * Get Users List
 * GET /api/users/
 */

import axiosInstance from "@/services/xhr";

export async function getUsers(params = {}) {
  const response = await axiosInstance.get("/users/", { params });
  return response.data;
}

