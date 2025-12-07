/**
 * Add Bookmark
 * POST /api/bookmarks/
 */

import axiosInstance from "@/services/xhr";

export async function addBookmark(propertyId) {
  const response = await axiosInstance.post("/bookmarks/", {
    property_id: propertyId,
  });
  return response.data;
}

