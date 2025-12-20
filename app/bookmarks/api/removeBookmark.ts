/**
 * Remove Bookmark
 * DELETE /api/bookmarks/{id}/
 */

import axiosInstance from "@/services/api/xhr";
import { AxiosResponse } from "axios";
import { extractError } from "@/services/err/errorHandler";

export interface RemoveBookmarkResponse {
  success?: boolean;
  message?: string;
  [key: string]: any;
}

/**
 * Remove bookmark by ID
 * @param id - Bookmark ID to remove
 * @returns Remove response
 */
export async function removeBookmark(id: number): Promise<RemoveBookmarkResponse> {
  try {
    const response: AxiosResponse<RemoveBookmarkResponse> = await axiosInstance.delete(`/bookmarks/${id}/`);
    return response.data;
  } catch (err) {
    throw extractError(err);
  }
}

