/**
 * Custom hook for fetching houses with debouncing and caching
 */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAtom } from "jotai";
import {
  filteredPropertiesAtom,
  filtersAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
  paginationAtom,
} from "../../../services/atoms/propertiesAtom";
import { getFilteredProperties } from "../../properties/api/getFilteredProperties";
import { FilterParams } from "../../properties/api/getFilteredProperties";
import { useError } from "../../../services/err/useError";
import { showErrorToast, showSuccessToast } from "../../../services/utils/toastManager";

const CACHE_KEY_PREFIX = "filtered_properties_cache_";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: any;
  timestamp: number;
  filters: FilterParams;
}

export function useFetchHouses() {
  const [filteredProperties, setFilteredProperties] = useAtom(filteredPropertiesAtom);
  const [filters, setFilters] = useAtom(filtersAtom);
  const [loading, setLoading] = useAtom(propertiesLoadingAtom);
  const [error, setError] = useAtom(propertiesErrorAtom);
  const [pagination, setPagination] = useAtom(paginationAtom);
  const [isFetching, setIsFetching] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { handleError } = useError();

  // Generate cache key from filters
  const getCacheKey = useCallback((filterParams: FilterParams): string => {
    const sorted = Object.keys(filterParams)
      .sort()
      .reduce((acc, key) => {
        if (filterParams[key] !== undefined && filterParams[key] !== null && filterParams[key] !== "") {
          acc[key] = filterParams[key];
        }
        return acc;
      }, {} as Record<string, any>);
    return CACHE_KEY_PREFIX + JSON.stringify(sorted);
  }, []);

  // Get cached data
  const getCachedData = useCallback((cacheKey: string): CacheEntry | null => {
    if (typeof window === "undefined") return null;

    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const entry: CacheEntry = JSON.parse(cached);
        const now = Date.now();
        if (now - entry.timestamp < CACHE_DURATION) {
          return entry;
        } else {
          // Cache expired, remove it
          localStorage.removeItem(cacheKey);
        }
      }
    } catch (err) {
      // Ignore cache errors
    }
    return null;
  }, []);

  // Set cached data
  const setCachedData = useCallback((cacheKey: string, data: any, filterParams: FilterParams) => {
    if (typeof window === "undefined") return;

    try {
      const entry: CacheEntry = {
        data,
        timestamp: Date.now(),
        filters: filterParams,
      };
      localStorage.setItem(cacheKey, JSON.stringify(entry));
    } catch (err) {
      // Ignore storage errors (quota exceeded, etc.)
    }
  }, []);

  // Fetch properties with caching
  const fetchProperties = useCallback(
    async (filterParams: FilterParams, useCache: boolean = true) => {
      if (isFetching) return; // Prevent duplicate requests

      const cacheKey = getCacheKey(filterParams);

      // Check cache first
      if (useCache) {
        const cached = getCachedData(cacheKey);
        if (cached) {
          setFilteredProperties(cached.data.results || []);
          setPagination({
            count: cached.data.count || 0,
            next: cached.data.next || null,
            previous: cached.data.previous || null,
            page: cached.data.page,
            total_pages: cached.data.total_pages,
          });
          setLoading(false);
          setError(null);
          return; // Use cached data
        }
      }

      setIsFetching(true);
      setLoading(true);
      setError(null);

      try {
        const response = await getFilteredProperties(filterParams);
        setFilteredProperties(response.results);
        setPagination({
          count: response.count,
          next: response.next,
          previous: response.previous,
          page: response.page,
          total_pages: response.total_pages,
        });

        // Cache the result
        setCachedData(cacheKey, response, filterParams);
      } catch (err: any) {
        const errorMessage = err.message || "خطا در دریافت اطلاعات";
        setError(err);
        handleError(err, { showToast: true });

        // Show user-friendly error messages (with deduplication)
        if (err.status === 500) {
          showErrorToast("خطا در سرور. لطفاً بعداً تلاش کنید.", "map-fetch-500");
        } else if (err.status === 404) {
          showErrorToast("املاکی یافت نشد", "map-fetch-404");
        } else if (err.message?.includes("Network") || err.message?.includes("CORS")) {
          showErrorToast("خطا در اتصال به سرور", "map-fetch-network");
        } else {
          showErrorToast(`خطا در دریافت املاک: ${errorMessage}`, "map-fetch-general");
        }
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    },
    [
      isFetching,
      getCacheKey,
      getCachedData,
      setCachedData,
      setFilteredProperties,
      setLoading,
      setError,
      setPagination,
      handleError,
    ]
  );

  // Debounced fetch (300ms)
  const debouncedFetch = useCallback(
    (filterParams: FilterParams) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        fetchProperties(filterParams, true);
      }, 300);
    },
    [fetchProperties]
  );

  // Fetch when filters change (with debounce)
  useEffect(() => {
    // Clear any pending debounce
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Check cache first (instant)
    const cacheKey = getCacheKey(filters);
    const cached = getCachedData(cacheKey);
    if (cached) {
      setFilteredProperties(cached.data.results || []);
      setPagination({
        count: cached.data.count || 0,
        next: cached.data.next || null,
        previous: cached.data.previous || null,
        page: cached.data.page,
        total_pages: cached.data.total_pages,
      });
      setLoading(false);
      setError(null);
    } else {
      // Debounce API call
      debouncedFetch(filters);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [filters, getCacheKey, getCachedData, debouncedFetch, setFilteredProperties, setPagination, setLoading, setError]);

  // Load more (pagination) with time limits
  const loadMore = useCallback(async () => {
    if (!pagination.next || loading || isFetching) return;

    try {
      setIsFetching(true);
      const url = new URL(pagination.next);
      const page = url.searchParams.get("page");
      const newFilters = { ...filters, page: page ? Number(page) : undefined };
      
      // Fetch with timeout protection
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Timeout: بارگذاری بیش از حد طول کشید")), 10000); // 10 seconds timeout
      });

      await Promise.race([
        fetchProperties(newFilters, false), // Don't use cache for pagination
        timeoutPromise,
      ]);
    } catch (err: any) {
      if (err.message?.includes("Timeout")) {
        showErrorToast("بارگذاری بیش از حد طول کشید. لطفاً دوباره تلاش کنید.", "map-loadmore-timeout");
      } else {
        handleError(err, { showToast: true });
      }
    } finally {
      setIsFetching(false);
    }
  }, [pagination.next, filters, loading, isFetching, fetchProperties, handleError]);

  return {
    filteredProperties,
    loading,
    error,
    pagination,
    isFetching,
    fetchProperties,
    loadMore,
  };
}

