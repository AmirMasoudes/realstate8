/**
 * Get Property By ID API
 * Fetches a single property by ID
 */

import xhr from "../../../services/api/xhr";
import { Property } from "../../../services/base/atoms";
import { extractError } from "../../../services/err/errorHandler";

/**
 * Get property by ID
 */
export async function getPropertyById(id: number): Promise<Property> {
  try {
    const response = await xhr.get<Property>(`properties/${id}/`, undefined, {
      showErrorToast: true,
    });
    return response;
  } catch (err) {
    throw extractError(err);
  }
}

