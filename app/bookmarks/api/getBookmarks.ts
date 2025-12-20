/**
 * Get User Bookmarks
 * GET /api/bookmarks/
 */

import axiosInstance from "@/services/api/xhr";
import { AxiosResponse } from "axios";
import { extractError } from "@/services/err/errorHandler";
import { Bookmark } from "@/services/atoms/baseAtoms";

export interface GetBookmarksParams {
  page?: number;
  limit?: number;
  property_id?: number;
  [key: string]: any;
}

export interface BookmarksResponse {
  results?: Bookmark[];
  count?: number;
  next?: string | null;
  previous?: string | null;
  [key: string]: any;
}

/**
 * Get user bookmarks
 * @param params - Query parameters
 * @returns Bookmarks list or response
 */
export async function getBookmarks(params: GetBookmarksParams = {}): Promise<Bookmark[] | BookmarksResponse> {
  try {
    const response: AxiosResponse<Bookmark[] | BookmarksResponse> = await axiosInstance.get("/bookmarks/", { params });
    return response.data;
  } catch (err) {
    throw extractError(err);
  }
}

