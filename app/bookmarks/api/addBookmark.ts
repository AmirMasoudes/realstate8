/**
 * Add Bookmark
 * POST /api/bookmarks/
 */

import axiosInstance from "@/services/api/xhr";
import { AxiosResponse } from "axios";
import { extractError } from "@/services/err/errorHandler";

export interface BookmarkResponse {
  id: number;
  property_id: number;
  user?: number;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

/**
 * Add property to bookmarks
 * @param propertyId - Property ID to bookmark
 * @returns Bookmark response
 */
export async function addBookmark(propertyId: number): Promise<BookmarkResponse> {
  try {
    const response: AxiosResponse<BookmarkResponse> = await axiosInstance.post("/bookmarks/", {
      property_id: propertyId,
    });
    return response.data;
  } catch (err) {
    throw extractError(err);
  }
}

