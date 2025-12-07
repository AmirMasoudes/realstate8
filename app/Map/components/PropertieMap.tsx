/**
 * Properties Map Component with Mapbox
 * Displays properties on an interactive map with markers
 */

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { propertiesListAtom, propertiesLoadingAtom } from "../../../services/atoms/propertiesAtom";
import { getProperties } from "../../Home/api/getProperties";
import { Property } from "../../../services/base/atoms";
import { useRouter } from "next/navigation";

// Mapbox access token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "pk.eyJ1IjoibWlyYXNob2xkaW5nIiwiYSI6ImNtaXUxd3czMTB5YmEzZ29ucmh4YWRnc2gifQ.HbAUxfGidk9DPNQtbXF5fw";

interface PropertyWithCoordinates extends Property {
  latitude?: number;
  longitude?: number;
}

export default function PropertieMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [properties, setProperties] = useAtom(propertiesListAtom);
  const [loading, setLoading] = useAtom(propertiesLoadingAtom);
  const router = useRouter();
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Set Mapbox token
    mapboxgl.accessToken = MAPBOX_TOKEN;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [51.3890, 35.6892], // Tehran, Iran (default center)
      zoom: 12,
      language: "fa", // Persian language
    });

    map.current.on("load", () => {
      setMapLoaded(true);
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Fetch properties
  useEffect(() => {
    const loadProperties = async () => {
      if (properties.length > 0) return; // Already loaded

      setLoading(true);
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (err) {
        console.error("Error loading properties:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [properties.length, setProperties, setLoading]);

  // Add markers to map
  useEffect(() => {
    if (!map.current || !mapLoaded || properties.length === 0) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Create markers for each property
    properties.forEach((property) => {
      // اگر property دارای مختصات جغرافیایی باشد استفاده می‌کنیم
      // در غیر این صورت از location string استفاده می‌کنیم (geocoding نیاز دارد)
      const propertyWithCoords = property as PropertyWithCoordinates;

      // اگر مختصات وجود دارد
      if (propertyWithCoords.latitude && propertyWithCoords.longitude) {
        const el = document.createElement("div");
        el.className = "custom-marker";
        el.innerHTML = `
          <div class="marker-container">
            <div class="marker-pin"></div>
            <div class="marker-price">${formatPrice(property.price, property.currency || "Toman")}</div>
          </div>
        `;

        const marker = new mapboxgl.Marker(el)
          .setLngLat([propertyWithCoords.longitude, propertyWithCoords.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div class="popup-content">
                <h3 class="popup-title">${property.title || "ملک"}</h3>
                <p class="popup-price">${formatPrice(property.price, property.currency || "Toman")}</p>
                <div class="popup-details">
                  <span>📐 ${property.area} متر مربع</span>
                  <span>🛏️ ${property.bedrooms} خواب</span>
                </div>
                <button class="popup-button" data-property-id="${property.id}">
                  مشاهده جزئیات
                </button>
              </div>
            `)
          )
          .addTo(map.current!);

        // Handle popup button click
        marker.getPopup()?.on("open", () => {
          const button = document.querySelector(
            `.popup-content button[data-property-id="${property.id}"]`
          );
          button?.addEventListener("click", () => {
            router.push(`/Detail/${property.id}`);
          });
        });

        markersRef.current.push(marker);
      }
    });

    // Fit map to show all markers
    if (markersRef.current.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      markersRef.current.forEach((marker) => {
        const lngLat = marker.getLngLat();
        bounds.extend([lngLat.lng, lngLat.lat]);
      });
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
      });
    }
  }, [mapLoaded, properties, router]);

  // Format price
  function formatPrice(price: number, currency: string = "Toman"): string {
    const formatted = new Intl.NumberFormat("fa-IR").format(price);
    const currencyText = currency === "Toman" ? "تومان" : currency;
    return formatted + " " + currencyText;
  }

  if (!MAPBOX_TOKEN || MAPBOX_TOKEN === "YOUR_MAPBOX_TOKEN_HERE") {
    return (
      <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-red-600 font-bold mb-2">خطا: Mapbox Token تنظیم نشده</p>
          <p className="text-gray-600 text-sm">
            لطفاً NEXT_PUBLIC_MAPBOX_TOKEN را در فایل .env.local تنظیم کنید
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] relative rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a5f] mx-auto mb-4"></div>
            <p className="text-gray-600">در حال بارگذاری نقشه...</p>
          </div>
        </div>
      )}

      {/* Custom styles for markers and popup */}
      <style jsx global>{`
        .custom-marker {
          width: 50px;
          height: 50px;
          cursor: pointer;
        }

        .marker-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .marker-pin {
          width: 30px;
          height: 30px;
          background: #1e3a5f;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          position: absolute;
          top: 5px;
          left: 10px;
        }

        .marker-pin::after {
          content: "";
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .marker-price {
          position: absolute;
          top: 35px;
          left: 0;
          right: 0;
          background: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: bold;
          color: #1e3a5f;
          white-space: nowrap;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          text-align: center;
        }

        .mapboxgl-popup-content {
          padding: 0;
          border-radius: 8px;
          font-family: "Vazir", "Tahoma", "Arial", sans-serif;
          direction: rtl;
        }

        .popup-content {
          padding: 16px;
          min-width: 200px;
        }

        .popup-title {
          font-size: 16px;
          font-weight: bold;
          color: #1e3a5f;
          margin-bottom: 8px;
        }

        .popup-price {
          font-size: 18px;
          font-weight: bold;
          color: #2d5a8f;
          margin-bottom: 12px;
        }

        .popup-details {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
          font-size: 14px;
          color: #666;
        }

        .popup-button {
          width: 100%;
          padding: 8px 16px;
          background: #1e3a5f;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .popup-button:hover {
          background: #2d5a8f;
        }

        .mapboxgl-ctrl-logo {
          display: none !important;
        }
      `}</style>
    </div>
  );
}

