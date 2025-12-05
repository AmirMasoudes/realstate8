/**
 * Property Detail Page API
 */

import xhr from "../../../services/api/xhr";
import { Property } from "../../../services/base/atoms";
import { logServerError } from "../../../services/err/error";

/**
 * Fetch property by ID
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
