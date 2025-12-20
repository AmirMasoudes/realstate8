/**
 * Get Filtered Properties API
 * Fetches properties with filter parameters
 * Endpoint: GET /api/properties/filter/
 */

import xhr from "../../../services/api/xhr";
import { Property } from "../../../services/base/atoms";
import { extractError } from "../../../services/err/errorHandler";

export interface FilterParams {
  city_name?: string;
  min_price?: number;
  max_price?: number;
  min_area?: number;
  max_area?: number;
  bedrooms?: number;
  bedrooms_min?: number;
  bedrooms_max?: number;
  bathrooms?: number;
  status?: string;
  property_type_name?: string;
  search?: string;
  ordering?: string;
  page?: number;
  limit?: number;
  [key: string]: any; // Allow other filter fields
}

export interface FilteredPropertiesResponse {
  results: Property[];
  count: number;
  next: string | null;
  previous: string | null;
  page?: number;
  total_pages?: number;
}

/**
 * Get filtered properties
 */
export async function getFilteredProperties(
  filters: FilterParams = {}
): Promise<FilteredPropertiesResponse> {
  try {
    // Remove undefined and empty values
    const cleanFilters: Record<string, any> = {};
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== undefined && value !== null && value !== "") {
        cleanFilters[key] = value;
      }
    });

    const response = await xhr.get<FilteredPropertiesResponse>(
      "properties/filter/",
      cleanFilters,
      {
        showErrorToast: true,
      }
    );

    // Handle both paginated and array responses
    if (Array.isArray(response)) {
      return {
        results: response,
        count: response.length,
        next: null,
        previous: null,
      };
    }

    return {
      results: response.results || [],
      count: response.count || 0,
      next: response.next || null,
      previous: response.previous || null,
      page: response.page,
      total_pages: response.total_pages,
    };
  } catch (err) {
    throw extractError(err);
  }
}

