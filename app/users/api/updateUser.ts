/**
 * Update User
 * PUT /api/users/{id}/
 */

import xhr from "../../../services/api/xhr";
import { extractError } from "../../../services/err/errorHandler";
import { User } from "../../../services/atoms/baseAtoms";

export interface UpdateUserData {
  name?: string;
  email?: string;
  username?: string;
  phone?: string;
  avatar?: string;
  [key: string]: any;
}

/**
 * Update user (full update)
 * @param id - User ID
 * @param data - Updated user data
 * @returns Updated user
 */
export async function updateUser(id: number, data: UpdateUserData): Promise<User> {
  try {
    const response = await xhr.put<User>(`users/${id}/`, data);
    // xhr.put returns AxiosResponse, extract data property
    return (response as any).data || response;
  } catch (err) {
    throw extractError(err);
  }
}

