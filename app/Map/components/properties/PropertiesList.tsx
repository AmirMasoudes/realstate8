/**
 * Properties List Component
 * Grid layout: 2 columns on desktop, 1 column on mobile
 * Infinite scroll with Intersection Observer
 */

"use client";

import React, { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { useAtom } from "jotai";
import { Property } from "../../../../services/base/atoms";
import { selectedPropertyIdAtom } from "../../../../services/atoms/propertiesAtom";
import PropertyCard from "./PropertyCard";

interface PropertiesListProps {
  properties: Property[];
  onPropertyClick?: (property: Property) => void;
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  className?: string;
}

// Configuration: Time limits and constraints
const MIN_LOAD_INTERVAL = 1500; // Minimum 1.5 seconds between loads
const MAX_LOAD_COUNT = 50; // Maximum 50 load more operations

export default function PropertiesList({
  properties,
  onPropertyClick,
  loading = false,
  onLoadMore,
  hasMore = false,
  className = "",
}: PropertiesListProps) {
  const [selectedPropertyId] = useAtom(selectedPropertyIdAtom);
  const selectedRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const lastLoadTimeRef = useRef<number>(0);
  const [loadCount, setLoadCount] = useState<number>(0);
  const isLoadingRef = useRef<boolean>(false);

  // Scroll to selected property
  useEffect(() => {
    if (selectedPropertyId && selectedRef.current) {
      setTimeout(() => {
        selectedRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [selectedPropertyId]);

  // Reset counters when properties list is empty and not loading (new search started)
  useEffect(() => {
    if (properties.length === 0 && !loading) {
      setLoadCount(0);
      lastLoadTimeRef.current = 0;
      isLoadingRef.current = false;
    }
  }, [properties.length, loading]);

  // Infinite scroll with Intersection Observer + Time Limits
  useEffect(() => {
    if (!onLoadMore || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (!firstEntry.isIntersecting) return;

        const now = Date.now();
        const timeSinceLastLoad = now - lastLoadTimeRef.current;

        // Check time limit: Must wait at least MIN_LOAD_INTERVAL
        if (timeSinceLastLoad < MIN_LOAD_INTERVAL) {
          return;
        }

        // Check count limit: Maximum MAX_LOAD_COUNT loads
        if (loadCount >= MAX_LOAD_COUNT) {
          return;
        }

        // Check if already loading
        if (isLoadingRef.current) {
          return;
        }

        // All checks passed, load more
        isLoadingRef.current = true;
        lastLoadTimeRef.current = now;
        setLoadCount((prev) => prev + 1);

        onLoadMore();

        // Reset loading flag after a delay
        setTimeout(() => {
          isLoadingRef.current = false;
        }, MIN_LOAD_INTERVAL);
      },
      {
        root: null,
        rootMargin: "200px", // Start loading 200px before reaching the bottom
        threshold: 0.1,
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onLoadMore, hasMore, loading, loadCount]);

  // Memoize properties to avoid unnecessary re-renders
  const memoizedProperties = useMemo(() => properties, [properties]);

  if (loading && properties.length === 0) {
    return (
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-5 ${className}`}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden animate-pulse"
          >
            <div className="flex flex-row h-[140px]">
              <div className="flex-1 p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
              <div className="w-[140px] bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0 && !loading) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
        <div className="text-7xl mb-6">🏠</div>
        <p className="text-2xl font-bold text-gray-700 mb-3">املاکی یافت نشد</p>
        <p className="text-gray-500 text-center max-w-md">
          لطفاً فیلترهای خود را تغییر دهید و دوباره تلاش کنید
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-5 ${className}`}>
      {memoizedProperties.map((property) => {
        const isSelected = selectedPropertyId === property.id;
        return (
          <div key={property.id} ref={isSelected ? selectedRef : null} className="h-[140px] lg:h-[150px]">
            <PropertyCard property={property} isSelected={isSelected} onClick={() => onPropertyClick?.(property)} />
          </div>
        );
      })}
      </div>

      {/* Infinite Scroll Trigger */}
      {hasMore && loadCount < MAX_LOAD_COUNT ? (
        <div ref={loadMoreRef} className="py-8 flex justify-center">
          {loading ? (
            <div className="flex items-center gap-3 text-gray-600">
              <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="font-medium">در حال بارگذاری...</span>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-gray-400 text-sm mb-1">اسکرول کنید برای بارگذاری بیشتر</div>
              {loadCount > 0 && (
                <div className="text-[10px] text-gray-500">
                  {loadCount} / {MAX_LOAD_COUNT} بارگذاری
                </div>
              )}
            </div>
          )}
        </div>
      ) : hasMore && loadCount >= MAX_LOAD_COUNT ? (
        <div className="py-8 flex justify-center">
          <div className="text-center">
            <div className="text-gray-500 text-sm mb-1">حداکثر تعداد بارگذاری رسیده است</div>
            <div className="text-[10px] text-gray-400">
              برای مشاهده بیشتر، فیلترهای خود را تغییر دهید
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
