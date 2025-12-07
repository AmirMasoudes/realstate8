/**
 * Properties List Component for Map Page
 * Displays filtered properties in a scrollable list
 * Supports click to center map and highlight selection
 */

"use client";

import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { Property } from "../../../services/base/atoms";
import { selectedPropertyIdAtom } from "../../../services/atoms/propertiesAtom";
import { useRouter } from "next/navigation";

interface PropertiesListProps {
  properties: Property[];
  onPropertyClick?: (property: Property) => void;
  loading?: boolean;
  className?: string;
}

/**
 * Format price with thousands separator
 */
function formatPrice(price: number, currency: string = "Toman"): string {
  const formatted = new Intl.NumberFormat("fa-IR").format(price);
  const currencyText = currency === "Toman" ? "تومان" : currency;
  return formatted + " " + currencyText;
}

export default function PropertiesList({
  properties,
  onPropertyClick,
  loading = false,
  className = "",
}: PropertiesListProps) {
  const [selectedPropertyId, setSelectedPropertyId] = useAtom(selectedPropertyIdAtom);
  const router = useRouter();
  const selectedRef = useRef<HTMLDivElement>(null);

  // Scroll to selected property when it changes
  useEffect(() => {
    if (selectedPropertyId && selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedPropertyId]);

  const handlePropertyClick = (property: Property) => {
    setSelectedPropertyId(property.id);
    if (onPropertyClick) {
      onPropertyClick(property);
    }
  };

  const handleViewDetails = (propertyId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/Detail/${propertyId}`);
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
          >
            <div className="h-32 skeleton"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 skeleton w-3/4"></div>
              <div className="h-4 skeleton w-1/2"></div>
              <div className="h-8 skeleton"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
        <div className="text-6xl mb-4">🏠</div>
        <p className="text-xl font-semibold text-gray-700 mb-2">املاکی یافت نشد</p>
        <p className="text-gray-500 text-center">
          لطفاً فیلترهای خود را تغییر دهید و دوباره تلاش کنید
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col space-y-3 overflow-y-auto ${className}`}>
      {properties.map((property) => {
        const isSelected = selectedPropertyId === property.id;
        const imageUrl = property.primary_image || property.image;
        const locationString = [property.city_name, property.neighborhood, property.location]
          .filter(Boolean)
          .join("، ") || property.location || "موقعیت نامشخص";

        return (
          <div
            key={property.id}
            ref={isSelected ? selectedRef : null}
            onClick={() => handlePropertyClick(property)}
            className={`bg-white rounded-xl shadow-md border-2 overflow-hidden cursor-pointer transition-all duration-200 ${
              isSelected
                ? "border-[#1e3a5f] shadow-lg scale-[1.02]"
                : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
            }`}
          >
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="relative w-full sm:w-32 h-32 sm:h-auto bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={property.title || "Property"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-300"
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
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#1e3a5f] mb-1 line-clamp-1">
                    {property.title || "ملک"}
                  </h3>

                  {/* Location */}
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {locationString}
                  </p>

                  {/* Price */}
                  <div className="text-lg font-bold text-[#2d5a8f] mb-2">
                    {formatPrice(property.price, property.currency)}
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <span>📐</span>
                      <span>{property.area} متر</span>
                    </span>
                    {property.bedrooms !== undefined && (
                      <span className="flex items-center gap-1">
                        <span>🛏️</span>
                        <span>{property.bedrooms} خواب</span>
                      </span>
                    )}
                    {property.bathrooms !== undefined && (
                      <span className="flex items-center gap-1">
                        <span>🚿</span>
                        <span>{property.bathrooms} حمام</span>
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleViewDetails(property.id, e)}
                    className="px-4 py-1.5 bg-[#1e3a5f] text-white text-sm rounded-lg hover:bg-[#2d5a8f] transition-colors"
                  >
                    مشاهده
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

