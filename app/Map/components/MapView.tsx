/**
 * Enhanced Map View Component
 * Displays properties on an interactive map with markers
 * Supports property selection and map centering
 */

"use client";

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Property } from "../../../services/base/atoms";

// Mapbox access token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "pk.eyJ1IjoibWlyYXNob2xkaW5nIiwiYSI6ImNtaXUxd3czMTB5YmEzZ29ucmh4YWRnc2gifQ.HbAUxfGidk9DPNQtbXF5fw";

interface PropertyWithCoordinates extends Property {
  latitude?: number;
  longitude?: number;
}

interface MapViewProps {
  properties: Property[];
  selectedPropertyId?: number | null;
  onMarkerClick?: (property: Property) => void;
  onPopupViewClick?: (propertyId: number) => void;
  loading?: boolean;
  className?: string;
}

export interface MapViewRef {
  centerOnProperty: (property: Property) => void;
  fitBounds: () => void;
}

const MapView = forwardRef<MapViewRef, MapViewProps>(
  ({ properties, selectedPropertyId, onMarkerClick, onPopupViewClick, loading, className = "" }, ref) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);
    const popupsRef = useRef<mapboxgl.Popup[]>([]);
    const [mapLoaded, setMapLoaded] = useState(false);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      centerOnProperty: (property: Property) => {
        const propWithCoords = property as PropertyWithCoordinates;
        if (map.current && propWithCoords.latitude && propWithCoords.longitude) {
          map.current.flyTo({
            center: [propWithCoords.longitude, propWithCoords.latitude],
            zoom: 15,
            duration: 1000,
          });

          // Open popup for this property
          const marker = markersRef.current.find((m) => {
            const lngLat = m.getLngLat();
            return (
              Math.abs(lngLat.lng - propWithCoords.longitude!) < 0.0001 &&
              Math.abs(lngLat.lat - propWithCoords.latitude!) < 0.0001
            );
          });

          if (marker) {
            marker.togglePopup();
          }
        }
      },
      fitBounds: () => {
        if (map.current && markersRef.current.length > 0) {
          const bounds = new mapboxgl.LngLatBounds();
          markersRef.current.forEach((marker) => {
            const lngLat = marker.getLngLat();
            bounds.extend([lngLat.lng, lngLat.lat]);
          });
          map.current.fitBounds(bounds, {
            padding: { top: 50, bottom: 50, left: 50, right: 50 },
            maxZoom: 15,
            duration: 1000,
          });
        }
      },
    }));

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
        zoom: 11,
        language: "fa",
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

    // Add markers to map
    useEffect(() => {
      if (!map.current || !mapLoaded) return;

      // Clear existing markers and popups
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      popupsRef.current.forEach((popup) => popup.remove());
      popupsRef.current = [];

      // Create markers for each property with coordinates
      const propertiesWithCoords = properties.filter(
        (p) => (p as PropertyWithCoordinates).latitude && (p as PropertyWithCoordinates).longitude
      ) as PropertyWithCoordinates[];

      propertiesWithCoords.forEach((property) => {
        const el = document.createElement("div");
        el.className = "custom-marker";
        const isSelected = selectedPropertyId === property.id;
        el.innerHTML = `
          <div class="marker-container ${isSelected ? "selected" : ""}">
            <div class="marker-pin"></div>
            <div class="marker-price">${formatPrice(property.price, property.currency || "Toman")}</div>
          </div>
        `;

        const marker = new mapboxgl.Marker(el)
          .setLngLat([property.longitude!, property.latitude!])
          .setPopup(
            new mapboxgl.Popup({ offset: 25, closeOnClick: false }).setHTML(`
              <div class="popup-content">
                ${property.primary_image || property.image ? `
                  <img src="${property.primary_image || property.image}" alt="${property.title || "Property"}" 
                       class="popup-image" onerror="this.style.display='none'" />
                ` : ""}
                <h3 class="popup-title">${property.title || "ملک"}</h3>
                <p class="popup-price">${formatPrice(property.price, property.currency || "Toman")}</p>
                <div class="popup-details">
                  <span>📐 ${property.area} متر مربع</span>
                  <span>🛏️ ${property.bedrooms || 0} خواب</span>
                  ${property.bathrooms ? `<span>🚿 ${property.bathrooms} حمام</span>` : ""}
                </div>
                ${property.city_name || property.neighborhood ? `
                  <p class="popup-location">📍 ${[property.city_name, property.neighborhood].filter(Boolean).join("، ")}</p>
                ` : ""}
                <button class="popup-button" data-property-id="${property.id}">
                  مشاهده جزئیات
                </button>
              </div>
            `)
          )
          .addTo(map.current!);

        // Handle marker click
        el.addEventListener("click", () => {
          if (onMarkerClick) {
            onMarkerClick(property);
          }
        });

        // Handle popup button click
        marker.getPopup()?.on("open", () => {
          const button = document.querySelector(
            `.popup-content button[data-property-id="${property.id}"]`
          );
          button?.addEventListener("click", () => {
            if (onPopupViewClick) {
              onPopupViewClick(property.id);
            }
          });
        });

        markersRef.current.push(marker);
      });

      // Fit map to show all markers if there are any
      if (markersRef.current.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        markersRef.current.forEach((marker) => {
          const lngLat = marker.getLngLat();
          bounds.extend([lngLat.lng, lngLat.lat]);
        });
        map.current.fitBounds(bounds, {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          maxZoom: 15,
          duration: 0, // Instant fit on initial load
        });
      } else {
        // No properties, center on default location
        map.current.flyTo({
          center: [51.3890, 35.6892],
          zoom: 11,
          duration: 500,
        });
      }
    }, [mapLoaded, properties, selectedPropertyId, onMarkerClick, onPopupViewClick]);

    // Format price
    function formatPrice(price: number, currency: string = "Toman"): string {
      const formatted = new Intl.NumberFormat("fa-IR").format(price);
      const currencyText = currency === "Toman" ? "تومان" : currency;
      return formatted + " " + currencyText;
    }

    if (!MAPBOX_TOKEN || MAPBOX_TOKEN === "YOUR_MAPBOX_TOKEN_HERE") {
      return (
        <div className={`w-full h-full bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
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
      <div className={`w-full h-full relative ${className}`}>
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
            transition: transform 0.2s;
          }

          .custom-marker:hover {
            transform: scale(1.1);
          }

          .marker-container {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .marker-container.selected .marker-pin {
            background: #2d5a8f;
            box-shadow: 0 0 0 4px rgba(45, 90, 143, 0.3);
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
            transition: all 0.2s;
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
            max-width: 280px;
          }

          .popup-content {
            padding: 16px;
            min-width: 200px;
          }

          .popup-image {
            width: 100%;
            height: 120px;
            object-fit: cover;
            border-radius: 8px 8px 0 0;
            margin: -16px -16px 12px -16px;
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

          .popup-location {
            font-size: 12px;
            color: #666;
            margin-bottom: 8px;
          }

          .popup-details {
            display: flex;
            flex-wrap: wrap;
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
);

MapView.displayName = "MapView";

export default MapView;

