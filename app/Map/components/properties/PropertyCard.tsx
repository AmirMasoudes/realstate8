/**
 * Minimal Premium Property Card Component - Horizontal Layout
 * Minimal design: Image (right) | Info (left) | View Details (bottom)
 * Smaller fonts, compact sizes, beautiful layout
 */

"use client";

import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { Property } from "../../../../services/base/atoms";
import { likedIdsAtom, likeIdsMapAtom, likeLoadingAtom } from "../../../../services/atoms/propertiesAtom";
import { addLike, removeLike, checkLike } from "../../../Home/api/toggleLike";
import { formatPrice } from "../../../../services/utils/formatters";
import { showSuccessToast, showErrorToast } from "../../../../services/utils/toastManager";
import { useRouter } from "next/navigation";

interface PropertyCardProps {
  property: Property;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function PropertyCard({ property, isSelected = false, onClick }: PropertyCardProps) {
  const { id, price, area, bedrooms, currency = "Toman", primary_image, title } = property;
  const imageUrl = primary_image || property.image;
  const [imageError, setImageError] = useState(false);
  const [likedIds, setLikedIds] = useAtom(likedIdsAtom);
  const [likeIdsMap, setLikeIdsMap] = useAtom(likeIdsMapAtom);
  const [likeLoading, setLikeLoading] = useAtom(likeLoadingAtom);
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState<number | null>(null);
  const router = useRouter();

  // Check if property is liked on mount
  useEffect(() => {
    const checkIfLiked = async () => {
      if (likedIds.includes(id)) {
        setIsLiked(true);
        setLikeId(likeIdsMap[id] || null);
      } else {
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
    e.stopPropagation();
    e.preventDefault();

    if (likeLoading[id]) {
      return;
    }

    setLikeLoading({ ...likeLoading, [id]: true });

    try {
      if (isLiked && likeId) {
        await removeLike(likeId);
        setIsLiked(false);
        setLikeId(null);
        setLikedIds(likedIds.filter((likedId) => likedId !== id));
        const newMap = { ...likeIdsMap };
        delete newMap[id];
        setLikeIdsMap(newMap);
        showSuccessToast("لایک حذف شد");
      } else {
        const response = await addLike(id);
        setIsLiked(true);
        setLikeId(response.id);
        setLikedIds([...likedIds, id]);
        setLikeIdsMap({ ...likeIdsMap, [id]: response.id });
        showSuccessToast("لایک شد ❤️");
      }
    } catch (err: any) {
      showErrorToast(err.message || "خطا در لایک کردن", "property-like");
    } finally {
      setLikeLoading({ ...likeLoading, [id]: false });
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button[aria-label*="لایک"]') || target.closest('button[data-view-details]')) {
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`bg-white rounded-xl shadow-md border overflow-hidden cursor-pointer transition-all duration-200 transform hover:scale-[1.01] ease-in-out flex flex-col h-full relative ${
        isSelected
          ? "border-[#1e3a5f] shadow-lg ring-2 ring-[#1e3a5f]/20"
          : "border-gray-200 hover:border-[#1e3a5f]/40 hover:shadow-lg"
      }`}
    >
      {/* ============================================
          LIKE BUTTON — TOP LEFT CORNER (Minimal)
          ============================================ */}
      <button
        onClick={handleLikeClick}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        disabled={likeLoading[id]}
        className="absolute top-2 left-2 z-20 w-8 h-8 rounded-full 
                   bg-white/95 backdrop-blur-sm shadow-md
                   flex items-center justify-center
                   hover:bg-white hover:scale-110
                   transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed
                   group/like
                   pointer-events-auto border border-gray-100"
        aria-label={isLiked ? "حذف لایک" : "لایک کردن"}
        type="button"
      >
        {likeLoading[id] ? (
          <svg
            className="w-4 h-4 text-gray-400 animate-spin"
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
            className={`w-4 h-4 transition-all duration-200 ${
              isLiked
                ? "text-red-500 fill-red-500 scale-110"
                : "text-gray-400 group-hover/like:text-red-400 group-hover/like:scale-110"
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
          HORIZONTAL LAYOUT: Info (Left) | Image (Right)
          ============================================ */}
      <div className="flex flex-row h-full">
        {/* LEFT SIDE: Information - Minimal & Compact */}
        <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
          {/* Price Section - Minimal */}
          <div className="mb-2">
            <div className="text-[10px] text-gray-500 font-medium mb-0.5 uppercase tracking-wide">قیمت</div>
            <div className="text-base font-bold text-[#1e3a5f] leading-tight line-clamp-1">
              {formatPrice(price, currency)}
            </div>
          </div>

          {/* Area and Bedrooms - Compact Horizontal */}
          <div className="flex items-center gap-2 mb-2">
            {/* Area - Minimal */}
            <div className="flex items-center gap-1.5 bg-blue-50/80 px-2 py-1 rounded-md border border-blue-100">
              <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-3 h-3 text-white"
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
              <div className="flex flex-col leading-tight">
                <div className="text-sm font-bold text-gray-900">{area}</div>
                <div className="text-[10px] text-gray-600">متر</div>
              </div>
            </div>

            {/* Bedrooms - Minimal */}
            <div className="flex items-center gap-1.5 bg-green-50/80 px-2 py-1 rounded-md border border-green-100">
              <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-3 h-3 text-white"
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
              <div className="flex flex-col leading-tight">
                <div className="text-sm font-bold text-gray-900">{bedrooms}</div>
                <div className="text-[10px] text-gray-600">خواب</div>
              </div>
            </div>
          </div>

          {/* View Details Button - Minimal & Compact */}
          <button
            data-view-details
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/Detail/${id}`);
            }}
            className="w-full px-3 py-2 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] text-white rounded-lg hover:from-[#2d5a8f] hover:to-[#1e3a5f] transition-all duration-200 text-xs font-semibold shadow-sm hover:shadow-md transform hover:scale-[1.02] flex items-center justify-center gap-1.5"
          >
            <span>مشاهده جزئیات</span>
            <svg
              className="w-3.5 h-3.5 transform group-hover:translate-x-[-2px] transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* RIGHT SIDE: Image - Compact */}
        <div className="relative w-[140px] lg:w-[160px] h-full bg-gradient-to-br from-gray-100 via-blue-50 to-purple-50 flex-shrink-0 overflow-hidden">
          {imageUrl && !imageError ? (
            <>
              <img
                src={imageUrl}
                alt={title || "Property"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={() => setImageError(true)}
              />
              {/* Minimal Overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-black/0 to-black/0 group-hover:from-black/20 transition-all duration-300"></div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-gray-300 mx-auto mb-1"
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
                <p className="text-[10px] text-gray-400">بدون تصویر</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
