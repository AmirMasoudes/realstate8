/**
 * Custom Hook for Current User (Profile)
 * Manages fetching and updating current authenticated user
 */

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  currentUserAtom,
  currentUserLoadingAtom,
  currentUserErrorAtom,
} from "../atom/atom";
import { getCurrentUser } from "../api/getCurrentUser";
import { User } from "../atom/atom";
import { useError } from "../../../services/err/useError";

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [loading, setLoading] = useAtom(currentUserLoadingAtom);
  const [error, setError] = useAtom(currentUserErrorAtom);
  const { handleError, clearError } = useError();

  useEffect(() => {
    const loadCurrentUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCurrentUser();
        setCurrentUser(data);
      } catch (err) {
        const errorObj = err as any;
        setError(errorObj);
        // Don't show toast for 401 errors (user not authenticated)
        if (errorObj.status !== 401) {
          handleError(err, { showToast: true });
        }
      } finally {
        setLoading(false);
      }
    };

    loadCurrentUser();
  }, [setCurrentUser, setLoading, setError, handleError]);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCurrentUser();
      setCurrentUser(data);
    } catch (err) {
      const errorObj = err as any;
      setError(errorObj);
      if (errorObj.status !== 401) {
        handleError(err, { showToast: true });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    currentUser,
    loading,
    error,
    refetch,
    clearError,
  };
}

