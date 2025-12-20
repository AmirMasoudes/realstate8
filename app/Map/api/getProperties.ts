/**
 * Get Properties List
 * GET /api/properties/
 */

import axiosInstance from "@/services/api/xhr";
import { AxiosResponse } from "axios";
import { extractError } from "@/services/err/errorHandler";
import { Property } from "@/services/base/atoms";

export interface GetPropertiesParams {
  page?: number;
  limit?: number;
  search?: string;
  ordering?: string;
  [key: string]: any;
}

export interface PropertiesResponse {
  results?: Property[];
  count?: number;
  next?: string | null;
  previous?: string | null;
  [key: string]: any;
}

/**
 * Get properties list
 * @param params - Query parameters
 * @returns Properties list or paginated response
 */
export async function getProperties(params: GetPropertiesParams = {}): Promise<Property[] | PropertiesResponse> {
  try {
    const response: AxiosResponse<Property[] | PropertiesResponse> = await axiosInstance.get("/properties/", { params });
    return response.data;
  } catch (err) {
    throw extractError(err);
  }
}

