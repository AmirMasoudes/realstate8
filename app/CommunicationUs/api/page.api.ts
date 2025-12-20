/**
 * Communication Us Page API
 * All API calls for the Contact/Communication page should be defined here
 */

import xhr from "../../../services/api/xhr";
import { extractError } from "../../../services/err/errorHandler";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

/**
 * Submit contact form
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ContactResponse> {
  try {
    const response = await xhr.post<ContactResponse>("contact/", data);
    return (response as any).data || response;
  } catch (err) {
    throw extractError(err);
  }
}

