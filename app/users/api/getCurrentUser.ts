/**
 * Get Current User (Profile)
 * GET /api/users/me/
 */

import xhr from "../../../services/api/xhr";
import { extractError } from "../../../services/err/errorHandler";
import { User } from "../../../services/atoms/baseAtoms";

/**
 * Get current authenticated user profile
 * @returns Current user data
 */
export async function getCurrentUser(): Promise<User> {
  try {
    const response = await xhr.get<User>("users/me/");
    // xhr.get returns AxiosResponse, extract data property
    return (response as any).data || response;
  } catch (err) {
    throw extractError(err);
  }
}

