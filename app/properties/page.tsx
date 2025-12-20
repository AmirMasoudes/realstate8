/**
 * Properties Page with Filtering System
 * Complete filtering and display system
 */

"use client";

import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import {
  filteredPropertiesAtom,
  filtersAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
  paginationAtom,
} from "../../services/atoms/propertiesAtom";
import { getFilteredProperties } from "./api/getFilteredProperties";
import FilterPanel from "./components/FilterPanel";
import FilteredPropertyCard from "./components/FilteredPropertyCard";
import { useError } from "../../services/err/useError";

export default function PropertiesPage() {
  const router = useRouter();
  const [filteredProperties, setFilteredProperties] = useAtom(filteredPropertiesAtom);
  const [filters, setFilters] = useAtom(filtersAtom);
  const [loading, setLoading] = useAtom(propertiesLoadingAtom);
  const [error, setError] = useAtom(propertiesErrorAtom);
  const [pagination, setPagination] = useAtom(paginationAtom);
  const { handleError } = useError();

  // Fetch filtered properties when filters change
  useEffect(() => {
    const fetchFilteredProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getFilteredProperties(filters);
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
        handleError(err, { showToast: true }); // Toast is handled by useError with deduplication
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProperties();
  }, [filters, setFilteredProperties, setLoading, setError, setPagination, handleError]);

  // Loading skeleton
  if (loading && filteredProperties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <FilterPanel />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                <div className="h-48 skeleton"></div>
                <div className="p-5 space-y-4">
                  <div className="h-4 skeleton w-3/4"></div>
                  <div className="h-4 skeleton w-1/2"></div>
                  <div className="h-10 skeleton"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1e3a5f] mb-2">فهرست املاک</h1>
          <p className="text-gray-600">
            {pagination.count > 0
              ? `${pagination.count} ملک یافت شد`
              : "املاک را فیلتر کنید"}
          </p>
        </div>

        {/* Filter Panel */}
        <FilterPanel />

        {/* Results */}
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 font-semibold mb-2">خطا در دریافت اطلاعات</p>
            <p className="text-red-600">{error.message}</p>
          </div>
        ) : filteredProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredProperties.map((property) => (
                <FilteredPropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.total_pages && pagination.total_pages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => {
                    if (pagination.previous) {
                      const url = new URL(pagination.previous);
                      const page = url.searchParams.get("page");
                      setFilters({ ...filters, page: page ? Number(page) : 1 });
                    }
                  }}
                  disabled={!pagination.previous}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  قبلی
                </button>
                <span className="px-4 py-2">
                  صفحه {pagination.page || 1} از {pagination.total_pages}
                </span>
                <button
                  onClick={() => {
                    if (pagination.next) {
                      const url = new URL(pagination.next);
                      const page = url.searchParams.get("page");
                      setFilters({ ...filters, page: page ? Number(page) : 1 });
                    }
                  }}
                  disabled={!pagination.next}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  بعدی
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">🏠</div>
            <p className="text-xl font-semibold text-gray-700 mb-2">
              املاکی یافت نشد
            </p>
            <p className="text-gray-500">
              لطفاً فیلترهای خود را تغییر دهید و دوباره تلاش کنید
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

