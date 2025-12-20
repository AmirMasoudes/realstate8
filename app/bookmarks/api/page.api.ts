/**
 * Bookmarks Page API
 */

import xhr from "../../../services/api/xhr";
import { Property } from "../../../services/base/atoms";
import { extractError } from "../../../services/err/errorHandler";

/**
 * Fetch bookmarked properties
 */
export async function fetchBookmarkedProperties(): Promise<Property[]> {
  try {
    const response = await xhr.get<Property[] | { results: Property[] }>("bookmarks/");
    return Array.isArray(response) ? response : (response as any).results || [];
  } catch (err) {
    throw extractError(err);
  }
}

/**
 * Add property to bookmarks
 */
export async function addBookmark(propertyId: number): Promise<void> {
  try {
    await xhr.post(`bookmarks/`, { property_id: propertyId });
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
