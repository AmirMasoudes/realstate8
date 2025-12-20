/**
 * Search Properties
 * GET /api/properties/search/
 */

import axiosInstance from "@/services/api/xhr";
import { AxiosResponse } from "axios";
import { extractError } from "@/services/err/errorHandler";
import { Property } from "@/services/base/atoms";

export interface SearchPropertiesParams {
  q?: string;
  search?: string;
  city_name?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  bathrooms?: number;
  page?: number;
  limit?: number;
  [key: string]: any;
}

export interface SearchPropertiesResponse {
  results?: Property[];
  count?: number;
  next?: string | null;
  previous?: string | null;
  [key: string]: any;
}

/**
 * Search properties
 * @param params - Search parameters
 * @returns Search results
 */
export async function searchProperties(params: SearchPropertiesParams = {}): Promise<Property[] | SearchPropertiesResponse> {
  try {
    const response: AxiosResponse<Property[] | SearchPropertiesResponse> = await axiosInstance.get("/properties/search/", { params });
    return response.data;
  } catch (err) {
    throw extractError(err);
  }
}

