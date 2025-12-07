/**
 * Get Properties API
 * Fetches properties from backend and extracts only: price, area, bedrooms
 */

import xhr from "../../../services/api/xhr";
import { Property } from "../../../services/base/atoms";
import { extractError } from "../../../services/err/errorHandler";

export interface BackendProperty {
  id: number;
  title?: string;
  area: number;
  bedrooms: number;
  price: number;
  currency?: string;
  primary_image?: string | null;
  [key: string]: any; // Allow other fields from backend
}

/**
 * Fetch properties list from backend
 * Extracts only: price, area, bedrooms
 */
export async function getProperties(): Promise<Property[]> {
  try {
    const response = await xhr.get<BackendProperty[] | { results: BackendProperty[] }>(
      "properties/",
      {},
      {
        showErrorToast: true,
      }
    );

    // Handle both array and paginated response
    const data = Array.isArray(response) 
      ? response 
      : (response as any).results || [];

    // Extract only required fields: price, area, bedrooms, primary_image
    const properties: Property[] = data.map((item: BackendProperty) => ({
      id: item.id,
      area: item.area,
      bedrooms: item.bedrooms,
      price: item.price,
      currency: item.currency || "Toman",
      primary_image: item.primary_image || null,
      // Optional fields
      title: item.title,
      location: item.location,
      latitude: item.latitude,
      longitude: item.longitude,
    }));

    return properties;
  } catch (err) {
    throw extractError(err);
  }
}

