/**
 * Example Component: Property Detail
 * Demonstrates fetching single property by ID
 */

"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  selectedPropertyAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
} from "@/services/atoms/baseAtoms";
import { getPropertyById } from "../api/getPropertyById";

export default function PropertyDetail({ propertyId }) {
  const [property, setProperty] = useAtom(selectedPropertyAtom);
  const [loading, setLoading] = useAtom(propertiesLoadingAtom);
  const [error, setError] = useAtom(propertiesErrorAtom);

  useEffect(() => {
    if (!propertyId) return;

    const fetchProperty = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPropertyById(propertyId);
        setProperty(data);
      } catch (err) {
        setError({
          message: err.response?.data?.message || "خطا در دریافت اطلاعات",
          status: err.response?.status || 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, setProperty, setLoading, setError]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">در حال بارگذاری...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <div className="text-red-800 font-semibold">خطا</div>
        <div className="text-red-600">{error.message}</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center p-8">
        <div className="text-gray-500">املاک یافت نشد</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {property.image && (
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-96 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {property.title}
          </h1>
          <p className="text-gray-600 mb-4">{property.location}</p>
          <div className="text-2xl font-bold text-blue-600 mb-6">
            {property.price}
          </div>
          {property.description && (
            <p className="text-gray-700 mb-6">{property.description}</p>
          )}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {property.bedrooms && (
              <div className="text-center">
                <div className="text-2xl mb-2">🛏️</div>
                <div className="text-sm text-gray-600">خواب</div>
                <div className="font-semibold">{property.bedrooms}</div>
              </div>
            )}
            {property.bathrooms && (
              <div className="text-center">
                <div className="text-2xl mb-2">🚿</div>
                <div className="text-sm text-gray-600">حمام</div>
                <div className="font-semibold">{property.bathrooms}</div>
              </div>
            )}
            {property.area && (
              <div className="text-center">
                <div className="text-2xl mb-2">📐</div>
                <div className="text-sm text-gray-600">متراژ</div>
                <div className="font-semibold">{property.area}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

