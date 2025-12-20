/**
 * Get User by ID
 * GET /api/users/{id}/
 */

import xhr from "../../../services/api/xhr";
import { extractError } from "../../../services/err/errorHandler";
import { User } from "../../../services/atoms/baseAtoms";

/**
 * Get single user by ID
 * @param id - User ID
 * @returns User data
 */
export async function getUserById(id: number): Promise<User> {
  try {
    const response = await xhr.get<User>(`users/${id}/`);
    // xhr.get returns AxiosResponse, extract data property
    return (response as any).data || response;
  } catch (err) {
    throw extractError(err);
  }
}

