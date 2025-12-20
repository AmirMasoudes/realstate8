/**
 * Map Page - Fully Refactored & Optimized
 * Layout: Filters + List (left) | Map (right, centered)
 * Features: Clustering, Geolocation, Caching, Debouncing, Performance Optimizations
 * Premium UI Design
 */

"use client";

import React, { useRef, useCallback, Suspense } from "react";
import { useAtom } from "jotai";
import { selectedPropertyIdAtom } from "../../services/atoms/propertiesAtom";
import { Property } from "../../services/base/atoms";
import { useMapState } from "./hooks/useMapState";
import { useFetchHouses } from "./hooks/useFetchHouses";
import dynamic from "next/dynamic";
import MapContainer, { MapContainerRef } from "./components/map/MapContainer";
import FilterPanel from "./components/filters/FilterPanel";
import PropertiesList from "./components/properties/PropertiesList";
import { FilterSkeleton, PropertyCardSkeleton, MapSkeleton } from "./components/ui/LoadingSkeleton";
import { FilterParams } from "../properties/api/getFilteredProperties";

// Lazy load map container for better performance
const LazyMapContainer = dynamic(() => import("./components/map/MapContainer"), {
  loading: () => <MapSkeleton />,
  ssr: false,
});

export default function MapPage() {
  const [selectedPropertyId, setSelectedPropertyId] = useAtom(selectedPropertyIdAtom);
  const mapContainerRef = useRef<MapContainerRef>(null);
  const { mapState, isLoadingLocation } = useMapState();
  const { filteredProperties, loading, error, pagination, isFetching, loadMore } = useFetchHouses();

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: FilterParams) => {
    // Filters are handled by useFetchHouses hook via filtersAtom
  }, []);

  // Handle property click from list
  const handlePropertyClick = useCallback(
    (property: Property) => {
      setSelectedPropertyId(property.id);
      if (mapContainerRef.current) {
        mapContainerRef.current.centerOnProperty(property);
      }
    },
    [setSelectedPropertyId]
  );

  // Handle marker click from map
  const handleMarkerClick = useCallback(
    (property: Property) => {
      setSelectedPropertyId(property.id);
    },
    [setSelectedPropertyId]
  );

  // Handle popup view click
  const handlePopupViewClick = useCallback((propertyId: number) => {
    // Navigation is handled by MapContainer component
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Desktop/Tablet: Two-column layout */}
      <div className="hidden md:flex h-full w-full">
        {/* Left Panel: Filters + List - Premium Design - Horizontal Layout */}
        <div className="flex-shrink-0 w-[45%] lg:w-[40%] h-full flex flex-row bg-white/95 backdrop-blur-sm border-r-2 border-gray-200/50 shadow-2xl overflow-hidden">
          {/* Filters Section - Left Side (Fixed Width) - Premium */}
          <div className="flex-shrink-0 w-[280px] lg:w-[320px] h-full overflow-y-auto bg-white/95 backdrop-blur-sm border-l-2 border-gray-200/50 shadow-lg">
            <Suspense fallback={<FilterSkeleton />}>
              <FilterPanel onFiltersChange={handleFiltersChange} />
            </Suspense>
          </div>

          {/* Properties List Section - Right Side (Flexible) - Premium - Wider */}
          <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-gray-50/30">
            {error ? (
              <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-8 text-center shadow-lg">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-red-800 font-bold text-lg mb-2">خطا در دریافت اطلاعات</p>
                <p className="text-red-600 text-sm">{error?.message || "خطای نامشخص"}</p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                {/* Header - Premium */}
                <div className="mb-6 flex-shrink-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-extrabold bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] bg-clip-text text-transparent">
                      {pagination.count > 0 ? `${pagination.count} ملک یافت شد` : "فهرست املاک"}
                    </h3>
                    {pagination.count > 0 && (
                      <div className="px-4 py-1.5 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] text-white rounded-full text-sm font-bold shadow-md">
                        {pagination.count}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {loading && filteredProperties.length === 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <PropertyCardSkeleton key={i} />
                      ))}
                    </div>
                  ) : (
                    <PropertiesList
                      properties={filteredProperties}
                      onPropertyClick={handlePropertyClick}
                      loading={isFetching}
                      onLoadMore={loadMore}
                      hasMore={!!pagination.next}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Map (Centered) */}
        <div className="flex-1 h-full relative z-0">
          {isLoadingLocation ? (
            <MapSkeleton />
          ) : (
            <LazyMapContainer
              ref={mapContainerRef}
              properties={filteredProperties}
              selectedPropertyId={selectedPropertyId}
              initialCenter={mapState.center}
              initialZoom={mapState.zoom}
              onMarkerClick={handleMarkerClick}
              onPopupViewClick={handlePopupViewClick}
              loading={loading}
              className="rounded-none"
            />
          )}
        </div>
      </div>

      {/* Mobile: Vertical stack */}
      <div className="md:hidden flex flex-col h-full w-full">
        {/* Map - Top */}
        <div className="flex-shrink-0 w-full h-[40vh] relative z-0">
          {isLoadingLocation ? (
            <MapSkeleton />
          ) : (
            <LazyMapContainer
              ref={mapContainerRef}
              properties={filteredProperties}
              selectedPropertyId={selectedPropertyId}
              initialCenter={mapState.center}
              initialZoom={mapState.zoom}
              onMarkerClick={handleMarkerClick}
              onPopupViewClick={handlePopupViewClick}
              loading={loading}
              className="rounded-none"
            />
          )}
        </div>

        {/* Filters - Collapsible */}
        <div className="flex-shrink-0 border-t-2 border-gray-200 bg-white">
          <Suspense fallback={<FilterSkeleton />}>
            <FilterPanel onFiltersChange={handleFiltersChange} />
          </Suspense>
        </div>

        {/* List - Bottom (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-white to-gray-50/30">
          {error ? (
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6 text-center shadow-lg">
              <p className="text-red-800 font-bold mb-2">خطا در دریافت اطلاعات</p>
              <p className="text-red-600 text-sm">{error?.message || "خطای نامشخص"}</p>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="mb-4 flex-shrink-0">
                <h3 className="text-xl font-bold text-[#1e3a5f]">
                  {pagination.count > 0 ? `${pagination.count} ملک یافت شد` : "فهرست املاک"}
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto">
                {loading && filteredProperties.length === 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <PropertyCardSkeleton key={i} />
                    ))}
                  </div>
                ) : (
                  <PropertiesList
                    properties={filteredProperties}
                    onPropertyClick={handlePropertyClick}
                    loading={isFetching}
                    onLoadMore={loadMore}
                    hasMore={!!pagination.next}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
