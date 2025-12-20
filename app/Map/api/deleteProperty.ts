/**
 * Delete Property
 * DELETE /api/properties/{id}/
 */

import axiosInstance from "@/services/api/xhr";
import { AxiosResponse } from "axios";
import { extractError } from "@/services/err/errorHandler";

export interface DeletePropertyResponse {
  success?: boolean;
  message?: string;
  [key: string]: any;
}

/**
 * Delete property by ID
 * @param id - Property ID to delete
 * @returns Delete response
 */
export async function deleteProperty(id: number): Promise<DeletePropertyResponse> {
  try {
    const response: AxiosResponse<DeletePropertyResponse> = await axiosInstance.delete(`/properties/${id}/`);
    return response.data;
  } catch (err) {
    throw extractError(err);
  }
}

