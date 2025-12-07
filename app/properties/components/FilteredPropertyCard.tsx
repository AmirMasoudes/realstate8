/**
 * Filtered Property Card Component
 * Beautiful card for displaying filtered properties
 */

"use client";

import React from "react";
import Link from "next/link";
import { Property } from "../../../services/base/atoms";

interface FilteredPropertyCardProps {
  property: Property;
}

/**
 * Format price with thousands separator
 */
function formatPrice(price: number, currency: string = "Toman"): string {
  const formatted = new Intl.NumberFormat("fa-IR").format(price);
  const currencyText = currency === "Toman" ? "تومان" : currency;
  return formatted + " " + currencyText;
}

export default function FilteredPropertyCard({ property }: FilteredPropertyCardProps) {
  const {
    id,
    title,
    location,
    city_name,
    neighborhood,
    price,
    area,
    bedrooms,
    bathrooms,
    currency = "Toman",
    primary_image,
    image,
  } = property;

  const imageUrl = primary_image || image;
  
  // Build location string
  const locationString = [city_name, neighborhood, location]
    .filter(Boolean)
    .join("، ") || location || "موقعیت نامشخص";

  return (
    <Link href={`/Detail/${id}`}>
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group h-full flex flex-col">
        {/* Image Section */}
        <div className="relative h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title || "Property"}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
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
                <p className="text-xs text-gray-400">بدون تصویر</p>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-2 line-clamp-2">
            {title || "ملک"}
          </h3>

          {/* Location */}
          <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
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
          <div className="mb-4">
            <div className="text-xl font-bold text-[#2d5a8f]">
              {formatPrice(price, currency)}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-3 gap-3 mt-auto pt-4 border-t border-gray-100">
            {/* Area */}
            <div className="text-center">
              <div className="text-lg font-bold text-[#1e3a5f]">{area}</div>
              <div className="text-xs text-gray-500">متر مربع</div>
            </div>

            {/* Bedrooms */}
            <div className="text-center">
              <div className="text-lg font-bold text-[#1e3a5f]">
                {bedrooms || "-"}
              </div>
              <div className="text-xs text-gray-500">خواب</div>
            </div>

            {/* Bathrooms */}
            <div className="text-center">
              <div className="text-lg font-bold text-[#1e3a5f]">
                {bathrooms || "-"}
              </div>
              <div className="text-xs text-gray-500">حمام</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

