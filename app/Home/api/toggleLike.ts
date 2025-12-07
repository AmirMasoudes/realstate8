/**
 * Toggle Like API
 * Add or remove property like
 * Endpoint: /api/likes/{id}/
 */

import xhr from "../../../services/api/xhr";
import { extractError } from "../../../services/err/errorHandler";

export interface LikeResponse {
  id: number;
  updated_at: string;
  created_at: string;
  user: string;
  blog?: number | null;
  property?: number | null;
}

/**
 * Add like to property
 * POST /api/likes/
 */
export async function addLike(propertyId: number): Promise<LikeResponse> {
  try {
    console.log("Sending like request for property:", propertyId);
    const response = await xhr.post<LikeResponse>("likes/", { 
      property: propertyId 
    }, {
      showErrorToast: true,
    });
    console.log("Like response received:", response);
    return response;
  } catch (err) {
    console.error("Error adding like:", err);
    throw extractError(err);
  }
}

/**
 * Remove like from property
 * DELETE /api/likes/{id}/
 */
export async function removeLike(likeId: number): Promise<void> {
  try {
    console.log("Removing like with ID:", likeId);
    await xhr.delete(`likes/${likeId}/`, undefined, {
      showErrorToast: true,
    });
    console.log("Like removed successfully");
  } catch (err) {
    console.error("Error removing like:", err);
    throw extractError(err);
  }
}

/**
 * Check if property is liked and get like ID
 * GET /api/likes/
 */
export async function checkLike(propertyId: number): Promise<{ isLiked: boolean; likeId: number | null }> {
  try {
    const likes = await xhr.get<LikeResponse[] | { results: LikeResponse[] }>("likes/");
    const data = Array.isArray(likes) ? likes : (likes as any).results || [];
    
    // Find like for this property
    const like = data.find(
      (item: LikeResponse) =>
        item.property === propertyId || item.blog === propertyId
    );
    
    return {
      isLiked: !!like,
      likeId: like?.id || null,
    };
  } catch (err) {
    // If error, assume not liked
    return { isLiked: false, likeId: null };
  }
}

/**
 * Get all likes for current user
 */
export async function getUserLikes(): Promise<LikeResponse[]> {
  try {
    const likes = await xhr.get<LikeResponse[] | { results: LikeResponse[] }>("likes/");
    return Array.isArray(likes) ? likes : (likes as any).results || [];
  } catch (err) {
    throw extractError(err);
  }
}

