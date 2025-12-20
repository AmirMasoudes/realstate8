/**
 * Update Property
 * PUT /api/properties/{id}/
 */

import axiosInstance from "@/services/api/xhr";
import { AxiosResponse } from "axios";
import { extractError } from "@/services/err/errorHandler";
import { Property } from "@/services/base/atoms";

export interface UpdatePropertyData {
  title?: string;
  area?: number;
  bedrooms?: number;
  price?: number;
  currency?: string;
  location?: string;
  city_name?: string;
  neighborhood?: string;
  latitude?: number;
  longitude?: number;
  bathrooms?: number;
  description?: string;
  type?: string;
  status?: "available" | "sold" | "rented";
  category_id?: number;
  primary_image?: string;
  [key: string]: any;
}

/**
 * Update property (full update)
 * @param id - Property ID
 * @param data - Updated property data
 * @returns Updated property
 */
export async function updateProperty(id: number, data: UpdatePropertyData): Promise<Property> {
  try {
    const response: AxiosResponse<Property> = await axiosInstance.put(`/properties/${id}/`, data);
    return response.data;
  } catch (err) {
    throw extractError(err);
  }
}

