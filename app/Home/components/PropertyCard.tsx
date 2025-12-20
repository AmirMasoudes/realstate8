/**
 * Premium Property Card Component
 * Modern, beautiful, and structured design
 * Displays: primary_image (top), price, area, bedrooms (bottom)
 * Includes: Like button
 */

"use client";

import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { Property } from "../../../services/base/atoms";
import { likedIdsAtom, likeIdsMapAtom, likeLoadingAtom } from "../../../services/atoms/propertiesAtom";
import { addLike, removeLike, checkLike } from "../api/toggleLike";
import { showSuccessToast, showErrorToast } from "../../../services/utils/toastManager";

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
}

/**
 * Format price with thousands separator
 */
function formatPrice(price: number, currency: string = "Toman"): string {
  const formatted = new Intl.NumberFormat("fa-IR").format(price);
  const currencyText = currency === "Toman" ? "تومان" : currency;
  return formatted + " " + currencyText;
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  const { id, price, area, bedrooms, currency = "Toman", primary_image } = property;
  const imageUrl = primary_image || property.image;
  const [imageError, setImageError] = useState(false);
  const [likedIds, setLikedIds] = useAtom(likedIdsAtom);
  const [likeIdsMap, setLikeIdsMap] = useAtom(likeIdsMapAtom);
  const [likeLoading, setLikeLoading] = useAtom(likeLoadingAtom);
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState<number | null>(null);

  // Check if property is liked on mount
  useEffect(() => {
    const checkIfLiked = async () => {
      if (likedIds.includes(id)) {
        setIsLiked(true);
        setLikeId(likeIdsMap[id] || null);
      } else {
        // Check from API if not in local state
        try {
          const { isLiked: liked, likeId: foundLikeId } = await checkLike(id);
          setIsLiked(liked);
          setLikeId(foundLikeId);
          
          if (liked && foundLikeId) {
            setLikedIds([...likedIds, id]);
            setLikeIdsMap({ ...likeIdsMap, [id]: foundLikeId });
          }
        } catch (err) {
          // Silent fail
        }
      }
    };
    checkIfLiked();
  }, [id, likedIds, likeIdsMap, setLikedIds, setLikeIdsMap]);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    e.preventDefault(); // Prevent default behavior

    // Prevent multiple clicks
    if (likeLoading[id]) {
      return;
    }

    setLikeLoading({ ...likeLoading, [id]: true });

    try {
      if (isLiked && likeId) {
        // Remove like
        console.log("Removing like for property:", id, "likeId:", likeId);
        await removeLike(likeId);
        setIsLiked(false);
        setLikeId(null);
        setLikedIds(likedIds.filter((likedId) => likedId !== id));
        const newMap = { ...likeIdsMap };
        delete newMap[id];
        setLikeIdsMap(newMap);
        showSuccessToast("لایک حذف شد");
      } else {
        // Add like
        console.log("Adding like for property:", id);
        const response = await addLike(id);
        console.log("Like response:", response);
        setIsLiked(true);
        setLikeId(response.id);
        setLikedIds([...likedIds, id]);
        setLikeIdsMap({ ...likeIdsMap, [id]: response.id });
        showSuccessToast("لایک شد ❤️");
      }
    } catch (err: any) {
      console.error("Like error:", err);
      showErrorToast(err.message || "خطا در لایک کردن", "home-property-like");
    } finally {
      setLikeLoading({ ...likeLoading, [id]: false });
    }
  };

  return (
    <div
      onClick={(e) => {
        // Don't navigate if clicking on the like button
        const target = e.target as HTMLElement;
        if (target.closest('button[aria-label*="لایک"]')) {
          return;
        }
        if (onClick) {
          onClick();
        }
      }}
      className="bg-white rounded-xl shadow-md border border-gray-200 
                 overflow-hidden hover:shadow-lg transition-all duration-200 
                 transform hover:scale-[1.03] ease-in-out cursor-pointer group
                 flex flex-col h-full relative"
    >
      {/* ============================================
          LIKE BUTTON — TOP RIGHT CORNER
          ============================================ */}
      <button
        onClick={handleLikeClick}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        disabled={likeLoading[id]}
        className="absolute top-3 left-3 z-10 w-10 h-10 rounded-full 
                   bg-white/90 backdrop-blur-sm shadow-lg
                   flex items-center justify-center
                   hover:bg-white hover:scale-110
                   transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed
                   group/like
                   pointer-events-auto"
        aria-label={isLiked ? "حذف لایک" : "لایک کردن"}
        type="button"
      >
        {likeLoading[id] ? (
          <svg
            className="w-5 h-5 text-gray-400 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <svg
            className={`w-5 h-5 transition-all duration-200 ${
              isLiked
                ? "text-red-500 fill-red-500 scale-110"
                : "text-gray-400 group-hover/like:text-red-400"
            }`}
            fill={isLiked ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
      </button>

      {/* ============================================
          TOP SECTION — IMAGE AREA
          ============================================ */}
      <div className="relative h-[200px] w-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 rounded-t-xl overflow-hidden">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={property.title || "Property"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {/* Placeholder Icon */}
            <div className="text-center">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <p className="text-xs text-gray-400 font-medium">بدون تصویر</p>
            </div>
          </div>
        )}

        {/* Optional: Overlay gradient for better text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/0 group-hover:from-black/5 transition-all duration-300"></div>
      </div>

      {/* ============================================
          BOTTOM SECTION — INFORMATION
          ============================================ */}
      <div className="bg-white rounded-b-xl p-5 flex flex-col gap-4 flex-1">
        {/* Price Section */}
        <div className="border-b border-gray-100 pb-4">
          <div className="text-xs text-gray-500 font-medium mb-1.5">قیمت</div>
          <div className="text-xl font-bold text-[#1e3a5f] leading-tight">
            {formatPrice(price, currency)}
          </div>
        </div>

        {/* Area and Bedrooms Section */}
        <div className="flex items-center justify-between gap-4">
          {/* Area */}
          <div className="flex items-center gap-2.5 flex-1">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-[#1e3a5f]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-bold text-gray-900">{area}</div>
              <div className="text-xs text-gray-500">متر مربع</div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-12 bg-gray-200"></div>

          {/* Bedrooms */}
          <div className="flex items-center gap-2.5 flex-1">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-[#1e3a5f]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-bold text-gray-900">{bedrooms}</div>
              <div className="text-xs text-gray-500">خواب</div>
            </div>
          </div>
        </div>

        {/* Optional: View Details Indicator */}
        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-sm text-[#1e3a5f] font-medium group-hover:text-[#2d5a8f] transition-colors">
            <span>مشاهده جزئیات</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-[-2px] transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
