/**
 * Properties Page API
 * All API calls for the Properties page should be defined here
 */

import xhr from "../../services/api/xhr";
import { Property } from "../../services/base/atoms";
import { extractError } from "../../services/err/errorHandler";

export interface FetchPropertiesParams {
  page?: number;
  limit?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  category?: number;
  location?: string;
}

/**
 * Fetch properties list with filters
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
 * Fetch single property by ID
 */
export async function fetchPropertyById(id: number): Promise<Property> {
  try {
    const data = await xhr.get<Property>(`properties/${id}/`);
    return data;
  } catch (err) {
    throw extractError(err);
  }
}
