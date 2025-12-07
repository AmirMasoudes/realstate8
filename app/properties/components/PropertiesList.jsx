/**
 * Example Component: Properties List
 * Demonstrates how to use API functions with Jotai atoms
 */

"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  propertiesListAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
  filteredPropertiesWithSearchAtom,
} from "@/services/atoms/baseAtoms";
import { getProperties } from "../api/getProperties";

export default function PropertiesList() {
  const [properties, setProperties] = useAtom(propertiesListAtom);
  const [loading, setLoading] = useAtom(propertiesLoadingAtom);
  const [error, setError] = useAtom(propertiesErrorAtom);
  const [filteredProperties] = useAtom(filteredPropertiesWithSearchAtom);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProperties({
          page: 1,
          limit: 12,
        });
        setProperties(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError({
          message: err.response?.data?.message || "خطا در دریافت اطلاعات",
          status: err.response?.status || 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [setProperties, setLoading, setError]);

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

  const displayProperties = filteredProperties.length > 0 
    ? filteredProperties 
    : properties;

  if (displayProperties.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="text-gray-500">املاکی یافت نشد</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {displayProperties.map((property) => (
        <div
          key={property.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          {property.image && (
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {property.title}
            </h3>
            <p className="text-gray-600 mb-2">{property.location}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-blue-600">
                {property.price}
              </span>
              <div className="flex gap-2 text-sm text-gray-500">
                {property.bedrooms && (
                  <span>🛏️ {property.bedrooms}</span>
                )}
                {property.bathrooms && (
                  <span>🚿 {property.bathrooms}</span>
                )}
                {property.area && <span>📐 {property.area}</span>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

