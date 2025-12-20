/**
 * Minimal Premium Filter Panel Component
 * Compact, beautiful, and minimal design
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { filtersAtom } from "../../../../services/atoms/propertiesAtom";
import { FilterParams } from "../../../properties/api/getFilteredProperties";
import { useDebounce } from "../../../../services/utils/useDebounce";
import { showSuccessToast } from "../../../../services/utils/toastManager";

interface FilterPanelProps {
  onFiltersChange?: (filters: FilterParams) => void;
}

export default function FilterPanel({ onFiltersChange }: FilterPanelProps) {
  const [filters, setFilters] = useAtom(filtersAtom);
  const [localFilters, setLocalFilters] = useState<FilterParams>(filters);
  const [isExpanded, setIsExpanded] = useState(true);

  // Debounce search input
  const debouncedSearch = useDebounce(localFilters.search || "", 300);

  // Update filters when debounced search changes
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setLocalFilters((prev) => ({ ...prev, search: debouncedSearch }));
    }
  }, [debouncedSearch, filters.search]);

  // Apply filters
  const handleApply = useCallback(() => {
    setFilters(localFilters);
    if (onFiltersChange) {
      onFiltersChange(localFilters);
    }
    showSuccessToast("فیلترها اعمال شد");
  }, [localFilters, setFilters, onFiltersChange]);

  // Reset filters
  const handleReset = useCallback(() => {
    const emptyFilters: FilterParams = {};
    setLocalFilters(emptyFilters);
    setFilters(emptyFilters);
    if (onFiltersChange) {
      onFiltersChange(emptyFilters);
    }
    showSuccessToast("فیلترها پاک شد");
  }, [setFilters, onFiltersChange]);

  // Update local filters
  const updateFilter = useCallback((key: keyof FilterParams, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value || undefined }));
  }, []);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header - Minimal */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-[#1e3a5f]/5 to-[#2d5a8f]/5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1e3a5f]">فیلترها</h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden w-6 h-6 flex items-center justify-center text-gray-600 hover:text-[#1e3a5f] transition-colors"
            aria-label={isExpanded ? "بستن" : "باز کردن"}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filters Content - Scrollable */}
      <div className={`flex-1 overflow-y-auto ${isExpanded ? "" : "hidden md:block"}`}>
        <div className="p-3 space-y-3">
          {/* Search - Minimal */}
          <div>
            <label className="block text-[10px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              جستجو
            </label>
            <input
              type="text"
              value={localFilters.search || ""}
              onChange={(e) => updateFilter("search", e.target.value)}
              placeholder="جستجو..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-all bg-white"
            />
          </div>

          {/* City Name - Minimal */}
          <div>
            <label className="block text-[10px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              شهر
            </label>
            <input
              type="text"
              value={localFilters.city_name || ""}
              onChange={(e) => updateFilter("city_name", e.target.value)}
              placeholder="نام شهر..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-all bg-white"
            />
          </div>

          {/* Price Range - Compact */}
          <div className="space-y-2">
            <label className="block text-[10px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              محدوده قیمت
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  type="number"
                  value={localFilters.min_price || ""}
                  onChange={(e) => updateFilter("min_price", e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="حداقل"
                  className="w-full px-2.5 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-all bg-white"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={localFilters.max_price || ""}
                  onChange={(e) => updateFilter("max_price", e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="حداکثر"
                  className="w-full px-2.5 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-all bg-white"
                />
              </div>
            </div>
          </div>

          {/* Area Range - Compact */}
          <div className="space-y-2">
            <label className="block text-[10px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              محدوده متراژ
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  type="number"
                  value={localFilters.min_area || ""}
                  onChange={(e) => updateFilter("min_area", e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="حداقل"
                  className="w-full px-2.5 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-all bg-white"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={localFilters.max_area || ""}
                  onChange={(e) => updateFilter("max_area", e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="حداکثر"
                  className="w-full px-2.5 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-all bg-white"
                />
              </div>
            </div>
          </div>

          {/* Bedrooms - Minimal */}
          <div>
            <label className="block text-[10px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              تعداد خواب
            </label>
            <input
              type="number"
              value={localFilters.bedrooms || ""}
              onChange={(e) => updateFilter("bedrooms", e.target.value ? Number(e.target.value) : undefined)}
              placeholder="تعداد خواب..."
              min="0"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-all bg-white"
            />
          </div>

          {/* Property Type - Minimal */}
          <div>
            <label className="block text-[10px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              نوع ملک
            </label>
            <input
              type="text"
              value={localFilters.property_type_name || ""}
              onChange={(e) => updateFilter("property_type_name", e.target.value)}
              placeholder="نوع ملک..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-all bg-white"
            />
          </div>

          {/* Status - Minimal */}
          <div>
            <label className="block text-[10px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              وضعیت
            </label>
            <select
              value={localFilters.status || ""}
              onChange={(e) => updateFilter("status", e.target.value || undefined)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-all bg-white cursor-pointer"
            >
              <option value="">همه</option>
              <option value="for_sale">برای فروش</option>
              <option value="for_rent">برای اجاره</option>
              <option value="sold">فروخته شده</option>
              <option value="rented">اجاره داده شده</option>
            </select>
          </div>

          {/* Ordering - Minimal */}
          <div>
            <label className="block text-[10px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              مرتب‌سازی
            </label>
            <select
              value={localFilters.ordering || ""}
              onChange={(e) => updateFilter("ordering", e.target.value || undefined)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-all bg-white cursor-pointer"
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
      </div>

      {/* Action Buttons - Minimal & Compact */}
      <div className="flex-shrink-0 px-3 py-3 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white space-y-2">
        <button
          onClick={handleApply}
          className="w-full px-4 py-2.5 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] text-white rounded-lg hover:from-[#2d5a8f] hover:to-[#1e3a5f] transition-all duration-200 text-xs font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>اعمال فیلتر</span>
        </button>
        <button
          onClick={handleReset}
          className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-xs font-semibold transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>پاک کردن</span>
        </button>
      </div>
    </div>
  );
}
