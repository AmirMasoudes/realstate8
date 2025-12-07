/**
 * Map Page with Filters and Properties List
 * Map as fixed background, Filters and List as overlay on top
 */

"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAtom } from "jotai";
import {
  filteredPropertiesAtom,
  filtersAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
  paginationAtom,
  selectedPropertyIdAtom,
} from "../../services/atoms/propertiesAtom";
import { getFilteredProperties } from "../properties/api/getFilteredProperties";
import { Property } from "../../services/base/atoms";
import { useError } from "../../services/err/useError";
import toast from "react-hot-toast";
import MapView, { MapViewRef } from "./components/MapView";
import MapFilterPanel from "./components/MapFilterPanel";
import PropertiesList from "./components/PropertiesList";

export default function MapPage() {
  const [filteredProperties, setFilteredProperties] = useAtom(filteredPropertiesAtom);
  const [filters, setFilters] = useAtom(filtersAtom);
  const [loading, setLoading] = useAtom(propertiesLoadingAtom);
  const [error, setError] = useAtom(propertiesErrorAtom);
  const [pagination, setPagination] = useAtom(paginationAtom);
  const [selectedPropertyId, setSelectedPropertyId] = useAtom(selectedPropertyIdAtom);
  const [isFetching, setIsFetching] = useState(false);
  const mapViewRef = useRef<MapViewRef>(null);
  const { handleError } = useError();

  // Fetch filtered properties
  const fetchProperties = useCallback(
    async (filterParams = filters) => {
      if (isFetching) return; // Prevent duplicate requests

      setIsFetching(true);
      setLoading(true);
      setError(null);

      try {
        const response = await getFilteredProperties(filterParams);
        setFilteredProperties(response.results);
        setPagination({
          count: response.count,
          next: response.next,
          previous: response.previous,
          page: response.page,
          total_pages: response.total_pages,
        });
      } catch (err: any) {
        const errorMessage = err.message || "خطا در دریافت اطلاعات";
        setError(err);
        handleError(err, { showToast: true });
        toast.error(`خطا در دریافت املاک: ${errorMessage}`);
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    },
    [setFilteredProperties, setLoading, setError, setPagination, handleError, isFetching]
  );

  // Fetch properties when filters change
  useEffect(() => {
    fetchProperties(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Handle filter changes
  const handleFiltersChange = useCallback(
    (newFilters: typeof filters) => {
      setFilters(newFilters);
    },
    [setFilters]
  );

  // Handle property click from list
  const handlePropertyClick = useCallback(
    (property: Property) => {
      setSelectedPropertyId(property.id);
      if (mapViewRef.current) {
        mapViewRef.current.centerOnProperty(property);
      }
    },
    [setSelectedPropertyId]
  );

  // Handle marker click from map
  const handleMarkerClick = useCallback(
    (property: Property) => {
      setSelectedPropertyId(property.id);
      // Scroll list item into view (handled by PropertiesList component)
    },
    [setSelectedPropertyId]
  );

  // Handle popup view click
  const handlePopupViewClick = useCallback((propertyId: number) => {
    // Navigation is handled by MapView component
  }, []);

  // Load more properties (pagination)
  const loadMore = useCallback(async () => {
    if (!pagination.next || loading || isFetching) return;

    try {
      setIsFetching(true);
      const url = new URL(pagination.next);
      const page = url.searchParams.get("page");
      const newFilters = { ...filters, page: page ? Number(page) : undefined };
      await fetchProperties(newFilters);
    } catch (err) {
      handleError(err, { showToast: true });
    } finally {
      setIsFetching(false);
    }
  }, [pagination.next, filters, loading, isFetching, fetchProperties, handleError]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Map as fixed background - Full screen */}
      <div className="absolute inset-0 w-full h-full z-0">
        <MapView
          ref={mapViewRef}
          properties={filteredProperties}
          selectedPropertyId={selectedPropertyId}
          onMarkerClick={handleMarkerClick}
          onPopupViewClick={handlePopupViewClick}
          loading={loading}
          className="rounded-none"
        />
      </div>

      {/* Overlay Panel - Right side (40% tablet, 35% desktop) */}
      <div className="relative z-10 flex flex-row md:w-[40%] lg:w-[35%] ml-auto h-screen bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-2xl overflow-hidden">
        {/* Filters - Left side (Fixed) */}
        <div className="w-80 flex-shrink-0 h-screen overflow-y-auto bg-white/95 backdrop-blur-sm border-l border-gray-200">
          <MapFilterPanel onFiltersChange={handleFiltersChange} />
        </div>

        {/* Properties List - Right side */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col">
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-800 font-semibold mb-2">خطا در دریافت اطلاعات</p>
              <p className="text-red-600 text-sm">{error?.message || "خطای نامشخص"}</p>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="mb-4 flex-shrink-0">
                <h3 className="text-lg font-semibold text-[#1e3a5f]">
                  {pagination.count > 0 ? `${pagination.count} ملک یافت شد` : "فهرست املاک"}
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto">
                <PropertiesList
                  properties={filteredProperties}
                  onPropertyClick={handlePropertyClick}
                  loading={loading && filteredProperties.length === 0}
                />
              </div>
              {pagination.next && (
                <div className="mt-6 text-center flex-shrink-0">
                  <button
                    onClick={loadMore}
                    disabled={loading || isFetching}
                    className="px-6 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2d5a8f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading || isFetching ? "در حال بارگذاری..." : "بارگذاری بیشتر"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
