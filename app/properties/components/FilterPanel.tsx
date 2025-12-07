/**
 * Filter Panel Component
 * Beautiful filter UI for properties
 */

"use client";

import React, { useState } from "react";
import { useAtom } from "jotai";
import { filtersAtom } from "../../../services/atoms/propertiesAtom";
import { FilterParams } from "../api/getFilteredProperties";

export default function FilterPanel() {
  const [filters, setFilters] = useAtom(filtersAtom);
  const [localFilters, setLocalFilters] = useState<FilterParams>(filters);

  const handleInputChange = (key: string, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
  };

  const handleResetFilters = () => {
    const emptyFilters: FilterParams = {};
    setLocalFilters(emptyFilters);
    setFilters(emptyFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#1e3a5f]">فیلتر املاک</h2>
        <button
          onClick={handleResetFilters}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          پاک کردن فیلترها
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* City Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            شهر
          </label>
          <input
            type="text"
            value={localFilters.city_name || ""}
            onChange={(e) => handleInputChange("city_name", e.target.value)}
            placeholder="مثال: تهران"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
          />
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            حداقل قیمت
          </label>
          <input
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            حداکثر قیمت
          </label>
          <input
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            حداقل متراژ (متر مربع)
          </label>
          <input
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            حداکثر متراژ (متر مربع)
          </label>
          <input
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تعداد خواب
          </label>
          <input
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تعداد حمام
          </label>
          <input
            type="number"
            value={localFilters.bathrooms || ""}
            onChange={(e) =>
              handleInputChange("bathrooms", e.target.value ? Number(e.target.value) : undefined)
            }
            placeholder="مثال: 1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            وضعیت
          </label>
          <select
            value={localFilters.status || ""}
            onChange={(e) => handleInputChange("status", e.target.value || undefined)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
          >
            <option value="">همه</option>
            <option value="available">موجود</option>
            <option value="sold">فروخته شده</option>
            <option value="rented">اجاره داده شده</option>
          </select>
        </div>

        {/* Search */}
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            جستجو
          </label>
          <input
            type="text"
            value={localFilters.search || ""}
            onChange={(e) => handleInputChange("search", e.target.value)}
            placeholder="جستجو در عنوان، توضیحات و..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
          />
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-6 flex justify-end gap-4">
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
  );
}

