/**
 * Get Categories List
 * GET /api/categories/
 */

import xhr from "../../../services/api/xhr";
import { extractError } from "../../../services/err/errorHandler";
import { Category } from "../../../services/atoms/baseAtoms";

export interface GetCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
  [key: string]: any;
}

export interface CategoriesResponse {
  results?: Category[];
  count?: number;
  next?: string | null;
  previous?: string | null;
  [key: string]: any;
}

/**
 * Get categories list
 * @param params - Query parameters
 * @returns Categories list or paginated response
 */
export async function getCategories(params: GetCategoriesParams = {}): Promise<Category[] | CategoriesResponse> {
  try {
    // Remove undefined and empty values
    const cleanParams: Record<string, any> = {};
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== null && value !== "") {
        cleanParams[key] = value;
      }
    });

    const response = await xhr.get<Category[] | CategoriesResponse>("categories/", cleanParams);
    // Handle both array and paginated response
    return (response as any).data || response;
  } catch (err) {
    throw extractError(err);
  }
}

