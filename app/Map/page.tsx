"use client";

import React, { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import {
  propertiesAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
  searchQueryAtom,
  filtersAtom,
  filteredPropertiesWithSearchAtom,
  currentPageAtom,
  itemsPerPageAtom,
} from "../../services/base/atoms";
import ErrorMessage from "../../services/components/ErrorMessage";
import { fetchProperties } from "./page.api";
import { useError } from "../../services/err/useError";

export default function PropertiesPage() {
  const [properties, setProperties] = useAtom(propertiesAtom);
  const [loading, setLoading] = useAtom(propertiesLoadingAtom);
  const [error, setError] = useAtom(propertiesErrorAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [filters, setFilters] = useAtom(filtersAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const itemsPerPage = useAtomValue(itemsPerPageAtom);
  const filteredProperties = useAtomValue(filteredPropertiesWithSearchAtom);
  const { handleError, clearError } = useError();

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProperties({
          ...filters,
          search: searchQuery || undefined,
        });
        setProperties(data);
      } catch (err) {
        const errorObj = err as any;
        setError(errorObj);
        handleError(err, { showToast: true });
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [setProperties, setLoading, setError, searchQuery, filters, handleError]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1);
  };

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  if (loading && properties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-64 skeleton"></div>
                <div className="p-6 space-y-4">
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
    <div className="min-h-screen bg-gray-50 py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ErrorMessage className="mb-6" onDismiss={() => { setError(null); clearError(); }} />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
            فهرست املاک
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            خانه ایده‌آل خود را از بین مجموعه گسترده املاک ما پیدا کنید
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="جستجو در املاک..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="حداقل قیمت"
                value={filters.minPrice || ""}
                onChange={(e) =>
                  handleFilterChange("minPrice", e.target.value || undefined)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="حداکثر قیمت"
                value={filters.maxPrice || ""}
                onChange={(e) =>
                  handleFilterChange("maxPrice", e.target.value || undefined)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {paginatedProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {paginatedProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="relative h-64 bg-gradient-to-br from-[#1e3a5f] via-[#4a7ba8] to-[#7ba8d4] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-6xl opacity-30">🏠</div>
                    </div>
                    <div className="absolute top-4 left-4 bg-[#1e3a5f] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {property.price}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                      <div className="text-white font-semibold text-lg">
                        {property.title}
                      </div>
                      <div className="text-white/90 text-sm flex items-center gap-1 mt-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {property.location}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl mb-1">🛏️</div>
                        <div className="text-sm text-gray-600">
                          {property.bedrooms} خواب
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-1">🚿</div>
                        <div className="text-sm text-gray-600">
                          {property.bathrooms} حمام
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-1">📐</div>
                        <div className="text-sm text-gray-600">
                          {property.area}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/Detail/${property.id}`}
                      className="block w-full bg-[#1e3a5f] text-white py-3 rounded-lg font-semibold hover:bg-[#0f2a47] transition-all duration-300 transform group-hover:scale-105 text-center"
                    >
                      مشاهده جزئیات
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-reverse space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  قبلی
                </button>
                <span className="px-4 py-2">
                  صفحه {currentPage} از {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  بعدی
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">املاکی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
}
