/**
 * Remove Bookmark
 * DELETE /api/bookmarks/{id}/
 */

import axiosInstance from "@/services/xhr";

export async function removeBookmark(id) {
  const response = await axiosInstance.delete(`/bookmarks/${id}/`);
  return response.data;
}

