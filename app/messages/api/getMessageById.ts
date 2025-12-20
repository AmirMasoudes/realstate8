/**
 * Get Message by ID
 * GET /api/messages/{id}/
 */

import xhr from "../../../services/api/xhr";
import { extractError } from "../../../services/err/errorHandler";
import { Message } from "../../../services/atoms/baseAtoms";

/**
 * Get single message by ID
 * @param id - Message ID
 * @returns Message data
 */
export async function getMessageById(id: number): Promise<Message> {
  try {
    const response = await xhr.get<Message>(`messages/${id}/`);
    // xhr.get returns AxiosResponse, extract data property
    return (response as any).data || response;
  } catch (err) {
    throw extractError(err);
  }
}

