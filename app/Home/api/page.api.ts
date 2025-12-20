/**
 * Home Page API
 * All API calls for the Home page should be defined here
 */

import { getProperties } from "./api/getProperties";
import { Property } from "../../services/base/atoms";

export interface FetchPropertiesParams {
  page?: number;
  limit?: number;
  search?: string;
}

/**
 * Fetch properties list
 * Re-export from api/getProperties for backward compatibility
 */
export async function fetchProperties(
  params?: FetchPropertiesParams
): Promise<Property[]> {
  // For now, ignore params and fetch all
  // Can be extended later to support pagination
  return getProperties();
}

/**
 * Fetch featured properties
 */
export async function fetchFeaturedProperties(): Promise<Property[]> {
  // Use same function for now, can be extended later
  return getProperties();
}
