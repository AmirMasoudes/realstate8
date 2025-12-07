"use client";

import React, { useEffect } from "react";
import { useAtom } from "jotai";
import Link from "next/link";
import {
  propertiesAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
} from "../../../services/base/atoms";
import ErrorMessage from "../../../services/components/ErrorMessage";
import { fetchProperties } from "../page.api";
import { useError } from "../../../services/err/useError";

export default function ListProp() {
  const [properties, setProperties] = useAtom(propertiesAtom);
  const [loading, setLoading] = useAtom(propertiesLoadingAtom);
  const [error, setError] = useAtom(propertiesErrorAtom);
  const { handleError, clearError } = useError();

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (err) {
        const errorObj = err as any;
        setError(errorObj);
        handleError(err, { showToast: true });
      } finally {
        setLoading(false);
      }
    };

    if (properties.length === 0) {
      loadProperties();
    }
  }, [setProperties, setLoading, setError, properties.length, handleError]);

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-gray-50 to-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Loading Header */}
          <div className="text-center mb-12">
            <div className="h-12 skeleton w-64 mx-auto mb-4 rounded-lg"></div>
            <div className="h-6 skeleton w-96 mx-auto rounded-lg"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="h-64 skeleton"></div>
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
        <ErrorMessage className="mb-6" onDismiss={() => { setError(null); clearError(); }} />

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl 
                             transition-all duration-300 transform hover:-translate-y-2 group
                             border border-gray-100"
                >
                  {/* Property Image Placeholder */}
                  <div
                    className="relative h-64 bg-gradient-to-br from-[#1e3a5f] via-[#4a7ba8] to-[#7ba8d4] 
                                overflow-hidden"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-6xl opacity-30 group-hover:opacity-40 transition-opacity">🏠</div>
                    </div>
                    <div
                      className="absolute top-4 left-4 bg-[#1e3a5f] text-white px-4 py-2 rounded-full 
                                  text-sm font-semibold shadow-lg backdrop-blur-sm bg-opacity-95"
                    >
                      {property.price}
                    </div>
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent 
                                  p-5"
                    >
                      <div className="text-white font-bold text-lg mb-2">
                        {property.title}
                      </div>
                      <div className="text-white/90 text-sm flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{property.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4 mb-6 border-b border-gray-100 pb-4">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🛏️</div>
                        <div className="text-xs text-gray-500 mb-1">خواب</div>
                        <div className="text-sm font-semibold text-[#1e3a5f]">
                          {property.bedrooms}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-2">🚿</div>
                        <div className="text-xs text-gray-500 mb-1">حمام</div>
                        <div className="text-sm font-semibold text-[#1e3a5f]">
                          {property.bathrooms}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-2">📐</div>
                        <div className="text-xs text-gray-500 mb-1">متراژ</div>
                        <div className="text-sm font-semibold text-[#1e3a5f]">
                          {property.area}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/Detail/${property.id}`}
                      className="block w-full bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] text-white py-3.5 rounded-xl font-semibold 
                                   hover:from-[#0f2a47] hover:to-[#1e3a5f] transition-all duration-300 transform 
                                   group-hover:scale-105 text-center shadow-md hover:shadow-lg
                                   flex items-center justify-center gap-2"
                    >
                      <span>مشاهده جزئیات</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </Link>
                  </div>
                </div>
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏠</div>
            <p className="text-gray-600 text-xl font-medium">املاکی یافت نشد</p>
            <p className="text-gray-400 text-sm mt-2">لطفاً بعداً دوباره بررسی کنید</p>
          </div>
        )}
      </div>
    </div>
  );
}
