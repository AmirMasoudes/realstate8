/**
 * Get Users List
 * GET /api/users/
 */

import xhr from "../../../services/api/xhr";
import { extractError } from "../../../services/err/errorHandler";
import { User } from "../../../services/atoms/baseAtoms";

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  [key: string]: any;
}

export interface UsersResponse {
  results?: User[];
  count?: number;
  next?: string | null;
  previous?: string | null;
  [key: string]: any;
}

/**
 * Get users list
 * @param params - Query parameters
 * @returns Users list or paginated response
 */
export async function getUsers(params: GetUsersParams = {}): Promise<User[] | UsersResponse> {
  try {
    // Remove undefined and empty values
    const cleanParams: Record<string, any> = {};
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== null && value !== "") {
        cleanParams[key] = value;
      }
    });

    const response = await xhr.get<User[] | UsersResponse>("users/", cleanParams);
    // Handle both array and paginated response
    return (response as any).data || response;
  } catch (err) {
    throw extractError(err);
  }
}

