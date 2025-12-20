/**
 * Custom Hook for Home Page Properties
 * Manages fetching and state management for properties on home page
 */

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  propertiesListAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
} from "../atom/atom";
import { getProperties } from "../api/getProperties";
import { useError } from "../../../services/err/useError";

export function useHomeProperties() {
  const [properties, setProperties] = useAtom(propertiesListAtom);
  const [loading, setLoading] = useAtom(propertiesLoadingAtom);
  const [error, setError] = useAtom(propertiesErrorAtom);
  const { handleError, clearError } = useError();

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (err) {
        const errorObj = err as any;
        setError(errorObj);
        handleError(err, { showToast: true });
      } finally {
        setLoading(false);
      }
    };

    // Always fetch fresh data
    loadProperties();
  }, [setProperties, setLoading, setError, handleError]);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (err) {
      const errorObj = err as any;
      setError(errorObj);
      handleError(err, { showToast: true });
    } finally {
      setLoading(false);
    }
  };

  return {
    properties,
    loading,
    error,
    refetch,
    clearError,
  };
}

