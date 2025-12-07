/**
 * Home Page API
 * All API calls for the Home page should be defined here
 */

import xhr from "../../services/api/xhr";
import { Property } from "../../services/base/atoms";
import { extractError } from "../../services/err/errorHandler";

export interface FetchPropertiesParams {
  page?: number;
  limit?: number;
  search?: string;
}

/**
 * Fetch properties list
 */
export async function fetchProperties(
  params?: FetchPropertiesParams
): Promise<Property[]> {
  try {
    const data = await xhr.get<Property[]>("properties/", { params });
    return Array.isArray(data) ? data : data.results || [];
  } catch (err) {
    throw extractError(err);
  }
}

/**
 * Fetch featured properties
 */
export async function fetchFeaturedProperties(): Promise<Property[]> {
  try {
    const data = await xhr.get<Property[]>("properties/featured/");
    return Array.isArray(data) ? data : data.results || [];
  } catch (err) {
    throw extractError(err);
  }
}
