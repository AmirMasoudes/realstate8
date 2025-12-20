/**
 * Get Property by ID
 * GET /api/properties/{id}/
 */

import axiosInstance from "@/services/api/xhr";
import { AxiosResponse } from "axios";
import { extractError } from "@/services/err/errorHandler";
import { Property } from "@/services/base/atoms";

/**
 * Get single property by ID
 * @param id - Property ID
 * @returns Property data
 */
export async function getPropertyById(id: number): Promise<Property> {
  try {
    const response: AxiosResponse<Property> = await axiosInstance.get(`/properties/${id}/`);
    return response.data;
  } catch (err) {
    throw extractError(err);
  }
}

