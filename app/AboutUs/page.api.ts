/**
 * About Us Page API
 */

import xhr from "../../services/api/xhr";
import { extractError } from "../../services/err/errorHandler";

export interface AboutUsData {
  title: string;
  description: string;
  mission?: string;
  vision?: string;
  values?: string[];
  team?: Array<{
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
    const data = await xhr.get<AboutUsData>("about/");
    return data;
  } catch (err) {
    throw extractError(err);
  }
}
