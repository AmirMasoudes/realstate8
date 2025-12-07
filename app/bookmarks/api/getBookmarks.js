/**
 * Get User Bookmarks
 * GET /api/bookmarks/
 */

import axiosInstance from "@/services/xhr";

export async function getBookmarks(params = {}) {
  const response = await axiosInstance.get("/bookmarks/", { params });
  return response.data;
}

