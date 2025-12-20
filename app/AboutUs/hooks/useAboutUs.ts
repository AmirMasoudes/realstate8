/**
 * Custom Hook for About Us Page
 * Manages fetching and state management for about us data
 */

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  aboutUsAtom,
  aboutUsLoadingAtom,
  aboutUsErrorAtom,
} from "../atom/atom";
import { fetchAboutUsData } from "../api/page.api";
import { useError } from "../../../services/err/useError";

export function useAboutUs() {
  const [aboutUsData, setAboutUsData] = useAtom(aboutUsAtom);
  const [loading, setLoading] = useAtom(aboutUsLoadingAtom);
  const [error, setError] = useAtom(aboutUsErrorAtom);
  const { handleError, clearError } = useError();

  useEffect(() => {
    const loadAboutUs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAboutUsData();
        setAboutUsData(data);
      } catch (err) {
        const errorObj = err as any;
        setError(errorObj);
        handleError(err, { showToast: true });
      } finally {
        setLoading(false);
      }
    };

    loadAboutUs();
  }, [setAboutUsData, setLoading, setError, handleError]);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAboutUsData();
      setAboutUsData(data);
    } catch (err) {
      const errorObj = err as any;
      setError(errorObj);
      handleError(err, { showToast: true });
    } finally {
      setLoading(false);
    }
  };

  return {
    aboutUsData,
    loading,
    error,
    refetch,
    clearError,
  };
}

