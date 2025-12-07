/**
 * Property Detail Page API
 */

import xhr from "../../services/api/xhr";
import { Property } from "../../services/base/atoms";
import { extractError } from "../../services/err/errorHandler";

/**
 * Fetch property by ID
 */
export async function fetchPropertyById(id: number): Promise<Property> {
  try {
    const data = await xhr.get<Property>(`properties/${id}/`);
    return data;
  } catch (err) {
    throw extractError(err);
  }
}
