/**
 * Custom Hook for Property Detail Page
 * Manages fetching and state management for property detail
 */

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  detailPropertyAtom,
  detailLoadingAtom,
  detailErrorAtom,
} from "../atom/atom";
import { fetchPropertyById } from "../api/page.api";
import { useError } from "../../../services/err/useError";

export function usePropertyDetail(propertyId: number | null) {
  const [property, setProperty] = useAtom(detailPropertyAtom);
  const [loading, setLoading] = useAtom(detailLoadingAtom);
  const [error, setError] = useAtom(detailErrorAtom);
  const { handleError, clearError } = useError();

  useEffect(() => {
    if (!propertyId || isNaN(propertyId)) {
      setProperty(null);
      setError(null);
      setLoading(false);
      return;
    }

    const loadProperty = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPropertyById(propertyId);
        setProperty(data);
      } catch (err) {
        const errorObj = err as any;
        setError(errorObj);
        handleError(err, { showToast: true });
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [propertyId, setProperty, setLoading, setError, handleError]);

  const refetch = async () => {
    if (!propertyId || isNaN(propertyId)) return;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchPropertyById(propertyId);
      setProperty(data);
    } catch (err) {
      const errorObj = err as any;
      setError(errorObj);
      handleError(err, { showToast: true });
    } finally {
      setLoading(false);
    }
  };

  return {
    property,
    loading,
    error,
    refetch,
    clearError,
  };
}

