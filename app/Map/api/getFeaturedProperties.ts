/**
 * Get Featured Properties
 * GET /api/properties/featured/
 */

import axiosInstance from "@/services/api/xhr";
import { AxiosResponse } from "axios";
import { extractError } from "@/services/err/errorHandler";
import { Property } from "@/services/base/atoms";

export interface GetFeaturedPropertiesParams {
  limit?: number;
  page?: number;
  [key: string]: any;
}

export interface FeaturedPropertiesResponse {
  results?: Property[];
  count?: number;
  [key: string]: any;
}

/**
 * Get featured properties
 * @param params - Query parameters
 * @returns Featured properties list
 */
export async function getFeaturedProperties(params: GetFeaturedPropertiesParams = {}): Promise<Property[] | FeaturedPropertiesResponse> {
  try {
    const response: AxiosResponse<Property[] | FeaturedPropertiesResponse> = await axiosInstance.get("/properties/featured/", { params });
    return response.data;
  } catch (err) {
    throw extractError(err);
  }
}

