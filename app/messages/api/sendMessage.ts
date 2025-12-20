/**
 * Send Message/Inquiry
 * POST /api/messages/
 */

import xhr from "../../../services/api/xhr";
import { extractError } from "../../../services/err/errorHandler";
import { Message } from "../../../services/atoms/baseAtoms";

export interface SendMessageData {
  subject?: string;
  content: string;
  receiver_id?: number;
  property_id?: number;
  [key: string]: any;
}

/**
 * Send message/inquiry
 * @param messageData - Message data
 * @returns Created message
 */
export async function sendMessage(messageData: SendMessageData): Promise<Message> {
  try {
    const response = await xhr.post<Message>("messages/", messageData);
    // xhr.post returns AxiosResponse, extract data property
    return (response as any).data || response;
  } catch (err) {
    throw extractError(err);
  }
}

