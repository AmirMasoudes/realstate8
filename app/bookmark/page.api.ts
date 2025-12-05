/**
 * Bookmarks Page API
 */

import xhr from "../../services/api/xhr";
import { Property } from "../../services/base/atoms";
import { logServerError } from "../../services/err/error";

/**
 * Fetch bookmarked properties
 */
export async function fetchBookmarkedProperties(): Promise<Property[]> {
  try {
    const data = await xhr.get<Property[]>("/api/bookmarks");
    return data;
  } catch (error: any) {
    logServerError(error, {
      endpoint: "/api/bookmarks",
      method: "GET",
    });
    throw error;
  }
}

/**
 * Add property to bookmarks
 */
export async function addBookmark(propertyId: number): Promise<void> {
  try {
    await xhr.post(`/api/bookmarks/${propertyId}`);
  } catch (error: any) {
    logServerError(error, {
      endpoint: `/api/bookmarks/${propertyId}`,
      method: "POST",
    });
    throw error;
  }
}

/**
 * Remove property from bookmarks
 */
export async function removeBookmark(propertyId: number): Promise<void> {
  try {
    await xhr.delete(`/api/bookmarks/${propertyId}`);
  } catch (error: any) {
    logServerError(error, {
      endpoint: `/api/bookmarks/${propertyId}`,
      method: "DELETE",
    });
    throw error;
  }
}
