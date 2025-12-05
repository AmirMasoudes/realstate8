/**
 * About Us Page API
 */

import xhr from "../../services/api/xhr";
import { logServerError } from "../../services/err/error";

export interface AboutUsData {
  title: string;
  description: string;
  mission: string;
  vision: string;
  values: string[];
  team: Array<{
    name: string;
    role: string;
    image?: string;
  }>;
}

/**
 * Fetch about us data
 */
export async function fetchAboutUsData(): Promise<AboutUsData> {
  try {
    const data = await xhr.get<AboutUsData>("/api/about");
    return data;
  } catch (error: any) {
    logServerError(error, {
      endpoint: "/api/about",
      method: "GET",
    });
    throw error;
  }
}
