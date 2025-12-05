/**
 * Contact Us Page API
 */

import xhr from "../../services/api/xhr";
import { logServerError } from "../../services/err/error";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Submit contact form
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await xhr.post<{ success: boolean; message: string }>(
      "/api/contact",
      data
    );
    return response;
  } catch (error: any) {
    logServerError(error, {
      endpoint: "/api/contact",
      method: "POST",
      payload: data,
    });
    throw error;
  }
}
