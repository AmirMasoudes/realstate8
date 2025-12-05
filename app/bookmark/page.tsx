"use client";

import React, { useEffect } from "react";
import { useAtom } from "jotai";
import Link from "next/link";
import {
  bookmarksAtom,
  propertiesAtom,
  loadingAtom,
  errorAtom,
} from "../../services/base/atoms";
import ErrorMessage from "../../services/components/ErrorMessage";
import { fetchBookmarkedProperties } from "./page.api";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);
  const [properties, setProperties] = useAtom(propertiesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);

  useEffect(() => {
    const loadBookmarks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBookmarkedProperties();
        setProperties(data);
        setBookmarks(data.map((p) => p.id));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
  }, [setProperties, setBookmarks, setLoading, setError]);

  const bookmarkedProperties = properties.filter((p) =>
    bookmarks.includes(p.id)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
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
        <ErrorMessage className="mb-6" onDismiss={() => setError(null)} />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
            نشان‌گذاری‌های من
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            املاک مورد علاقه خود را اینجا مشاهده کنید
          </p>
        </div>

        {/* Bookmarks Grid */}
        {bookmarkedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookmarkedProperties.map((property) => (
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
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📑</div>
            <p className="text-gray-600 text-lg mb-4">
              هنوز املاکی را نشان‌گذاری نکرده‌اید
            </p>
            <Link
              href="/Prop"
              className="text-[#1e3a5f] hover:underline font-semibold"
            >
              مشاهده املاک
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
