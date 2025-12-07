/**
 * Get Messages/Inquiries
 * GET /api/messages/
 */

import axiosInstance from "@/services/xhr";

export async function getMessages(params = {}) {
  const response = await axiosInstance.get("/messages/", { params });
  return response.data;
}

