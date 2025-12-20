/**
 * React Hook for Error Handling
 */

import { useCallback } from "react";
import { useAtom } from "jotai";
import { errorAtom } from "../base/atoms";
import { extractError, parseError, isNetworkError, isServerError, isClientError } from "./errorHandler";
import { XHRError } from "../api/xhr";
import { showErrorToast } from "../utils/toastManager";

/**
 * Hook for handling errors in components
 */
export function useError() {
  const [error, setError] = useAtom(errorAtom);

  const handleError = useCallback(
    (err: unknown, options?: { showToast?: boolean; logError?: boolean }) => {
      const extracted = extractError(err);
      setError(extracted);

      // Show toast unless explicitly disabled (with deduplication)
      if (options?.showToast !== false) {
        showErrorToast(extracted.message, "useError-general");
      }

      // Log error in development
      if (options?.logError !== false && process.env.NODE_ENV === "development") {
        console.error("Error:", extracted);
      }
    },
    [setError]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  const getErrorMessage = useCallback((err: unknown): string => {
    return extractError(err).message;
  }, []);

  const getErrorDetails = useCallback((err: unknown) => {
    return parseError(err);
  }, []);

  return {
    error,
    handleError,
    clearError,
    getErrorMessage,
    getErrorDetails,
    isNetworkError: (err: unknown) => isNetworkError(err),
    isServerError: (err: unknown) => isServerError(err),
    isClientError: (err: unknown) => isClientError(err),
  };
}

