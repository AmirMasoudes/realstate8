/**
 * Properties Page API
 * All API calls for the Properties page should be defined here
 */

import xhr from "../../services/api/xhr";
import { Property } from "../../services/base/atoms";
import { logServerError } from "../../services/err/error";

export interface FetchPropertiesParams {
  page?: number;
  limit?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
}

/**
 * Fetch properties list with filters
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
 * Fetch single property by ID
 */
export async function fetchPropertyById(id: number): Promise<Property> {
  try {
    const data = await xhr.get<Property>(`/api/properties/${id}`);
    return data;
  } catch (error: any) {
    logServerError(error, {
      endpoint: `/api/properties/${id}`,
      method: "GET",
    });
    throw error;
  }
}
