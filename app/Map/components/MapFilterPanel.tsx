/**
 * Map Filter Panel Component
 * Collapsible filter panel for map page
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { filtersAtom } from "../../../services/atoms/propertiesAtom";
import { FilterParams } from "../../properties/api/getFilteredProperties";

interface MapFilterPanelProps {
  onFiltersChange?: (filters: FilterParams) => void;
  className?: string;
}

export default function MapFilterPanel({ onFiltersChange, className = "" }: MapFilterPanelProps) {
  const [filters, setFilters] = useAtom(filtersAtom);
  const [localFilters, setLocalFilters] = useState<FilterParams>(filters);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Array<{ key: string; label: string; value: any }>>([]);

  // Update active filters display
  useEffect(() => {
    const active: Array<{ key: string; label: string; value: any }> = [];
    if (localFilters.city_name) {
      active.push({ key: "city_name", label: "شهر", value: localFilters.city_name });
    }
    if (localFilters.min_price) {
      active.push({ key: "min_price", label: "حداقل قیمت", value: formatNumber(localFilters.min_price) });
    }
    if (localFilters.max_price) {
      active.push({ key: "max_price", label: "حداکثر قیمت", value: formatNumber(localFilters.max_price) });
    }
    if (localFilters.min_area) {
      active.push({ key: "min_area", label: "حداقل متراژ", value: `${localFilters.min_area} متر` });
    }
    if (localFilters.max_area) {
      active.push({ key: "max_area", label: "حداکثر متراژ", value: `${localFilters.max_area} متر` });
    }
    if (localFilters.bedrooms) {
      active.push({ key: "bedrooms", label: "خواب", value: `${localFilters.bedrooms} خواب` });
    }
    if (localFilters.bathrooms) {
      active.push({ key: "bathrooms", label: "حمام", value: `${localFilters.bathrooms} حمام` });
    }
    if (localFilters.status) {
      active.push({ key: "status", label: "وضعیت", value: getStatusLabel(localFilters.status) });
    }
    if (localFilters.search) {
      active.push({ key: "search", label: "جستجو", value: localFilters.search });
    }
    setActiveFilters(active);
  }, [localFilters]);

  // Sync local filters with atom
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleInputChange = (key: string, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const handleRemoveFilter = (key: string) => {
    setLocalFilters((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const handleApplyFilters = useCallback(() => {
    setFilters(localFilters);
    if (onFiltersChange) {
      onFiltersChange(localFilters);
    }
  }, [localFilters, setFilters, onFiltersChange]);

  const handleResetFilters = () => {
    const emptyFilters: FilterParams = {};
    setLocalFilters(emptyFilters);
    setFilters(emptyFilters);
    if (onFiltersChange) {
      onFiltersChange(emptyFilters);
    }
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      for_sale: "برای فروش",
      for_rent: "برای اجاره",
      sold: "فروخته شده",
      rented: "اجاره داده شده",
    };
    return labels[status] || status;
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>
      {/* Header with collapse button (mobile) */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 md:border-b-0">
        <h2 className="text-xl font-bold text-[#1e3a5f]">فیلتر املاک</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={isExpanded ? "بستن فیلترها" : "باز کردن فیلترها"}
        >
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Active filters chips */}
      {activeFilters.length > 0 && (
        <div className="px-4 pt-2 pb-3 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <span
                key={filter.key}
                className="inline-flex items-center gap-2 px-3 py-1 bg-[#e8f0f8] text-[#1e3a5f] rounded-full text-sm"
              >
                <span className="font-medium">{filter.label}:</span>
                <span>{filter.value}</span>
                <button
                  onClick={() => handleRemoveFilter(filter.key)}
                  className="hover:bg-[#1e3a5f] hover:text-white rounded-full p-0.5 transition-colors"
                  aria-label={`حذف فیلتر ${filter.label}`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filter form (collapsible on mobile) */}
      <div className={`${isExpanded ? "block" : "hidden md:block"}`}>
        <div className="p-4 space-y-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              جستجو
            </label>
            <input
              id="search"
              type="text"
              value={localFilters.search || ""}
              onChange={(e) => handleInputChange("search", e.target.value)}
              placeholder="جستجو در عنوان، توضیحات..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* City Name */}
            <div>
              <label htmlFor="city_name" className="block text-sm font-medium text-gray-700 mb-2">
                شهر
              </label>
              <input
                id="city_name"
                type="text"
                value={localFilters.city_name || ""}
                onChange={(e) => handleInputChange("city_name", e.target.value)}
                placeholder="مثال: تهران"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
              />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                وضعیت
              </label>
              <select
                id="status"
                value={localFilters.status || ""}
                onChange={(e) => handleInputChange("status", e.target.value || undefined)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
              >
                <option value="">همه</option>
                <option value="for_sale">برای فروش</option>
                <option value="for_rent">برای اجاره</option>
                <option value="sold">فروخته شده</option>
                <option value="rented">اجاره داده شده</option>
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label htmlFor="min_price" className="block text-sm font-medium text-gray-700 mb-2">
                حداقل قیمت
              </label>
              <input
                id="min_price"
                type="number"
                value={localFilters.min_price || ""}
                onChange={(e) =>
                  handleInputChange("min_price", e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="مثال: 50000000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
              />
            </div>

            {/* Max Price */}
            <div>
              <label htmlFor="max_price" className="block text-sm font-medium text-gray-700 mb-2">
                حداکثر قیمت
              </label>
              <input
                id="max_price"
                type="number"
                value={localFilters.max_price || ""}
                onChange={(e) =>
                  handleInputChange("max_price", e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="مثال: 200000000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
              />
            </div>

            {/* Min Area */}
            <div>
              <label htmlFor="min_area" className="block text-sm font-medium text-gray-700 mb-2">
                حداقل متراژ (متر مربع)
              </label>
              <input
                id="min_area"
                type="number"
                value={localFilters.min_area || ""}
                onChange={(e) =>
                  handleInputChange("min_area", e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="مثال: 50"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
              />
            </div>

            {/* Max Area */}
            <div>
              <label htmlFor="max_area" className="block text-sm font-medium text-gray-700 mb-2">
                حداکثر متراژ (متر مربع)
              </label>
              <input
                id="max_area"
                type="number"
                value={localFilters.max_area || ""}
                onChange={(e) =>
                  handleInputChange("max_area", e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="مثال: 200"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
              />
            </div>

            {/* Bedrooms */}
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                تعداد خواب
              </label>
              <input
                id="bedrooms"
                type="number"
                value={localFilters.bedrooms || ""}
                onChange={(e) =>
                  handleInputChange("bedrooms", e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="مثال: 2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
              />
            </div>

            {/* Bathrooms */}
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                تعداد حمام
              </label>
              <input
                id="bathrooms"
                type="number"
                value={localFilters.bathrooms || ""}
                onChange={(e) =>
                  handleInputChange("bathrooms", e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="مثال: 1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
              />
            </div>
          </div>

          {/* Ordering */}
          <div>
            <label htmlFor="ordering" className="block text-sm font-medium text-gray-700 mb-2">
              مرتب‌سازی
            </label>
            <select
              id="ordering"
              value={localFilters.ordering || ""}
              onChange={(e) => handleInputChange("ordering", e.target.value || undefined)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
            >
              <option value="">پیش‌فرض</option>
              <option value="price">قیمت: کم به زیاد</option>
              <option value="-price">قیمت: زیاد به کم</option>
              <option value="area">متراژ: کم به زیاد</option>
              <option value="-area">متراژ: زیاد به کم</option>
              <option value="created_at">جدیدترین</option>
              <option value="-created_at">قدیمی‌ترین</option>
            </select>
          </div>
        </div>

        {/* Action buttons */}
        <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={handleResetFilters}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            پاک کردن
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-8 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2d5a8f] transition-colors font-semibold"
          >
            اعمال فیلتر
          </button>
        </div>
      </div>
    </div>
  );
}

