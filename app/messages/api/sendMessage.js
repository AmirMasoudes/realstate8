/**
 * Send Message/Inquiry
 * POST /api/messages/
 */

import axiosInstance from "@/services/xhr";

export async function sendMessage(messageData) {
  const response = await axiosInstance.post("/messages/", messageData);
  return response.data;
}

