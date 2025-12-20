/**
 * Get Messages/Inquiries
 * GET /api/messages/
 */

import xhr from "../../../services/api/xhr";
import { extractError } from "../../../services/err/errorHandler";
import { Message } from "../../../services/atoms/baseAtoms";

export interface GetMessagesParams {
  page?: number;
  limit?: number;
  read?: boolean;
  sender_id?: number;
  receiver_id?: number;
  [key: string]: any;
}

export interface MessagesResponse {
  results?: Message[];
  count?: number;
  next?: string | null;
  previous?: string | null;
  [key: string]: any;
}

/**
 * Get messages/inquiries list
 * @param params - Query parameters
 * @returns Messages list or paginated response
 */
export async function getMessages(params: GetMessagesParams = {}): Promise<Message[] | MessagesResponse> {
  try {
    // Remove undefined and empty values
    const cleanParams: Record<string, any> = {};
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== null && value !== "") {
        cleanParams[key] = value;
      }
    });

    const response = await xhr.get<Message[] | MessagesResponse>("messages/", cleanParams);
    // Handle both array and paginated response
    return (response as any).data || response;
  } catch (err) {
    throw extractError(err);
  }
}

