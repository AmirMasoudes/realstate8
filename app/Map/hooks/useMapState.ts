/**
 * Custom hook for map state management
 * Handles initial center, zoom, and user location
 */

"use client";

import { useState, useEffect, useCallback } from "react";

interface MapState {
  center: [number, number];
  zoom: number;
  userLocation?: { lat: number; lng: number; city?: string };
}

const DEFAULT_CENTER: [number, number] = [51.3890, 35.6892]; // Tehran
const DEFAULT_ZOOM = 11;

const STORAGE_KEY = "map_initial_state";

export function useMapState() {
  const [mapState, setMapState] = useState<MapState>({
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
  });
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Load cached state from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        setMapState({
          center: parsed.center || DEFAULT_CENTER,
          zoom: parsed.zoom || DEFAULT_ZOOM,
          userLocation: parsed.userLocation,
        });
        setIsLoadingLocation(false);
        return; // Use cached state, skip geolocation
      }
    } catch (err) {
      // Ignore cache errors
    }

    // Try to get user location
    detectUserLocation();
  }, []);

  // Detect user location (navigator.geolocation + IP fallback)
  const detectUserLocation = useCallback(async () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    // Try navigator.geolocation first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const newState: MapState = {
            center: [longitude, latitude],
            zoom: 13, // Closer zoom for user location
            userLocation: { lat: latitude, lng: longitude },
          };

          setMapState(newState);
          setIsLoadingLocation(false);

          // Cache the state
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
          } catch (err) {
            // Ignore storage errors
          }
        },
        async (error) => {
          // Geolocation failed, try IP-based geolocation
          await tryIPGeolocation();
        },
        { timeout: 5000, enableHighAccuracy: false }
      );
    } else {
      // No geolocation support, try IP
      await tryIPGeolocation();
    }
  }, []);

  // Fallback to IP-based geolocation
  const tryIPGeolocation = useCallback(async () => {
    try {
      // Using ipapi.co (free tier)
      const response = await fetch("https://ipapi.co/json/", {
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) throw new Error("IP geolocation failed");

      const data = await response.json();

      if (data.latitude && data.longitude) {
        const newState: MapState = {
          center: [data.longitude, data.latitude],
          zoom: 12,
          userLocation: {
            lat: data.latitude,
            lng: data.longitude,
            city: data.city,
          },
        };

        setMapState(newState);
        setIsLoadingLocation(false);

        // Cache the state
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        } catch (err) {
          // Ignore storage errors
        }
      } else {
        throw new Error("No location data");
      }
    } catch (err) {
      // All location methods failed, use default
      setLocationError("موقعیت یافت نشد");
      setIsLoadingLocation(false);
      setMapState({
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      });
    }
  }, []);

  const updateMapState = useCallback((center: [number, number], zoom: number) => {
    setMapState((prev) => ({ ...prev, center, zoom }));
  }, []);

  return {
    mapState,
    isLoadingLocation,
    locationError,
    updateMapState,
    detectUserLocation,
  };
}

