/**
 * Create Property
 * POST /api/properties/
 */

import axiosInstance from "@/services/api/xhr";
import { AxiosResponse } from "axios";
import { extractError } from "@/services/err/errorHandler";
import { Property } from "@/services/base/atoms";

export interface CreatePropertyData {
  title?: string;
  area: number;
  bedrooms: number;
  price: number;
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
 * Create new property
 * @param data - Property data
 * @returns Created property
 */
export async function createProperty(data: CreatePropertyData): Promise<Property> {
  try {
    const response: AxiosResponse<Property> = await axiosInstance.post("/properties/", data);
    return response.data;
  } catch (err) {
    throw extractError(err);
  }
}

