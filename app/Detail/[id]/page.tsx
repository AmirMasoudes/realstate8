"use client";

import React, { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  selectedPropertyAtom,
  loadingAtom,
  errorAtom,
} from "../../../services/base/atoms";
import ErrorMessage from "../../../services/components/ErrorMessage";
import { fetchPropertyById } from "./page.api";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [property, setProperty] = useAtom(selectedPropertyAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);

  useEffect(() => {
    const loadProperty = async () => {
      if (!id || isNaN(id)) {
        router.push("/Prop");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await fetchPropertyById(id);
        setProperty(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id, setProperty, setLoading, setError, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="h-96 skeleton mb-6"></div>
            <div className="space-y-4">
              <div className="h-8 skeleton w-3/4"></div>
              <div className="h-4 skeleton w-1/2"></div>
              <div className="h-4 skeleton w-full"></div>
              <div className="h-4 skeleton w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">املاک یافت نشد</p>
            <Link
              href="/Prop"
              className="text-[#1e3a5f] hover:underline font-semibold"
            >
              بازگشت به فهرست املاک
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ErrorMessage className="mb-6" onDismiss={() => setError(null)} />

        <Link
          href="/Prop"
          className="text-[#1e3a5f] hover:underline mb-6 inline-block"
        >
          ← بازگشت به فهرست املاک
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image */}
          <div className="relative h-96 bg-gradient-to-br from-[#1e3a5f] via-[#4a7ba8] to-[#7ba8d4]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-9xl opacity-30">🏠</div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
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
              <div className="text-left">
                <div className="text-3xl font-bold text-[#1e3a5f]">
                  {property.price}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-3xl mb-2">🛏️</div>
                <div className="text-sm text-gray-600">اتاق خواب</div>
                <div className="text-lg font-semibold text-[#1e3a5f]">
                  {property.bedrooms}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🚿</div>
                <div className="text-sm text-gray-600">حمام</div>
                <div className="text-lg font-semibold text-[#1e3a5f]">
                  {property.bathrooms}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📐</div>
                <div className="text-sm text-gray-600">متراژ</div>
                <div className="text-lg font-semibold text-[#1e3a5f]">
                  {property.area}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🏷️</div>
                <div className="text-sm text-gray-600">وضعیت</div>
                <div className="text-lg font-semibold text-[#1e3a5f]">
                  {property.status === "available"
                    ? "موجود"
                    : property.status === "sold"
                    ? "فروخته شده"
                    : "اجاره داده شده"}
                </div>
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">
                  توضیحات
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-[#1e3a5f] text-white py-3 rounded-lg font-semibold hover:bg-[#0f2a47] transition-all duration-300">
                تماس با ما
              </button>
              <button className="flex-1 bg-white border-2 border-[#1e3a5f] text-[#1e3a5f] py-3 rounded-lg font-semibold hover:bg-[#1e3a5f] hover:text-white transition-all duration-300">
                درخواست بازدید
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
