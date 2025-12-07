/**
 * Toggle Bookmark API
 * Add or remove property from bookmarks
 */

import xhr from "../../../services/api/xhr";
import { extractError } from "../../../services/err/errorHandler";

/**
 * Add property to bookmarks
 */
export async function addBookmark(propertyId: number): Promise<void> {
  try {
    await xhr.post("bookmarks/", { property_id: propertyId });
  } catch (err) {
    throw extractError(err);
  }
}

/**
 * Remove property from bookmarks
 */
export async function removeBookmark(propertyId: number): Promise<void> {
  try {
    await xhr.delete(`bookmarks/${propertyId}/`);
  } catch (err) {
    throw extractError(err);
  }
}

/**
 * Check if property is bookmarked
 */
export async function checkBookmark(propertyId: number): Promise<boolean> {
  try {
    const bookmarks = await xhr.get<any[]>("bookmarks/");
    const data = Array.isArray(bookmarks) ? bookmarks : bookmarks.results || [];
    return data.some(
      (bookmark: any) =>
        bookmark.property_id === propertyId ||
        bookmark.property?.id === propertyId
    );
  } catch (err) {
    // If error, assume not bookmarked
    return false;
  }
}

