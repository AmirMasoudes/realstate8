/**
 * Home Page API
 * All API calls for the Home page should be defined here
 */

import xhr from "../../services/api/xhr";
import { Property } from "../../services/base/atoms";
import { logServerError } from "../../services/err/error";

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
    const data = await xhr.get<Property[]>("/api/properties", params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: any) {
    logServerError(error, {
      endpoint: "/api/properties",
      method: "GET",
      payload: params,
    });
    throw error;
  }
}

/**
 * Fetch featured properties
 */
export async function fetchFeaturedProperties(): Promise<Property[]> {
  try {
    const data = await xhr.get<Property[]>("/api/properties/featured");
    return data;
  } catch (error: any) {
    logServerError(error, {
      endpoint: "/api/properties/featured",
      method: "GET",
    });
    throw error;
  }
}

