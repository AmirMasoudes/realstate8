/**
 * Properties List Component
 * Fetches and displays properties using beautiful cards
 */

"use client";

import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import {
  propertiesListAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
} from "../../../services/atoms/propertiesAtom";
import { useError } from "../../../services/err/useError";
import { getProperties } from "../api/getProperties";
import PropertyCard from "./PropertyCard";
import ErrorMessage from "../../../services/components/ErrorMessage";
import Link from "next/link";

export default function ListProp() {
  const router = useRouter();
  const [properties, setProperties] = useAtom(propertiesListAtom);
  const [loading, setLoading] = useAtom(propertiesLoadingAtom);
  const [error, setError] = useAtom(propertiesErrorAtom);
  const { handleError, clearError } = useError();

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (err) {
        const errorObj = err as any;
        setError(errorObj);
        handleError(err, { showToast: true });
      } finally {
        setLoading(false);
      }
    };

    // Always fetch fresh data
    loadProperties();
  }, [setProperties, setLoading, setError, handleError]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-gradient-to-b from-gray-50 to-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Loading Header */}
          <div className="text-center mb-12">
            <div className="h-12 skeleton w-64 mx-auto mb-4 rounded-lg"></div>
            <div className="h-6 skeleton w-96 mx-auto rounded-lg"></div>
          </div>

          {/* Loading Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
              >
                <div className="h-32 skeleton"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 skeleton w-3/4 rounded"></div>
                  <div className="h-4 skeleton w-1/2 rounded"></div>
                  <div className="h-10 skeleton rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Error Message */}
        <ErrorMessage
          className="mb-6"
          onDismiss={() => {
            setError(null);
            clearError();
          }}
        />

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-[#2d5a8f] uppercase tracking-wider bg-[#e8f0f8] px-4 py-2 rounded-full">
              املاک منتخب
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e3a5f] mb-4">
            خانه ایده‌آل شما
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            خانه ایده‌آل خود را از مجموعه منتخب املاک ما پیدا کنید
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#1e3a5f] to-[#4a7ba8] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Properties Grid */}
        {properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={() => {
                    router.push(`/Detail/${property.id}`);
                  }}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-16">
              <Link
                href="/Prop"
                className="inline-flex items-center gap-3 bg-white border-2 border-[#1e3a5f] text-[#1e3a5f] px-10 py-4 
                             rounded-xl font-semibold hover:bg-[#1e3a5f] hover:text-white 
                             transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
              >
                <span>مشاهده همه املاک</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏠</div>
            <p className="text-gray-600 text-xl font-medium">املاکی یافت نشد</p>
            <p className="text-gray-400 text-sm mt-2">
              لطفاً بعداً دوباره بررسی کنید
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
