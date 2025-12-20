/**
 * Loading Skeleton Components
 * Beautiful bounce animation skeletons
 */

"use client";

import React from "react";

export function FilterSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full aspect-square bg-gray-200"></div>
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <div className="h-5 bg-gray-200 rounded mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-12 mx-auto"></div>
            </div>
          ))}
        </div>
        <div className="h-10 bg-gray-200 rounded mt-3"></div>
      </div>
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center animate-pulse">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
      </div>
    </div>
  );
}

