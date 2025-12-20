/**
 * Get Category by ID
 * GET /api/categories/{id}/
 */

import xhr from "../../../services/api/xhr";
import { extractError } from "../../../services/err/errorHandler";
import { Category } from "../../../services/atoms/baseAtoms";

/**
 * Get single category by ID
 * @param id - Category ID
 * @returns Category data
 */
export async function getCategoryById(id: number): Promise<Category> {
  try {
    const response = await xhr.get<Category>(`categories/${id}/`);
    // xhr.get returns AxiosResponse, extract data property
    return (response as any).data || response;
  } catch (err) {
    throw extractError(err);
  }
}

