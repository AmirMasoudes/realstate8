/**
 * Custom Hook for Single User
 * Manages fetching a single user by ID
 */

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  selectedUserAtom,
  usersLoadingAtom,
  usersErrorAtom,
} from "../atom/atom";
import { getUserById } from "../api/getUserById";
import { User } from "../atom/atom";
import { useError } from "../../../services/err/useError";

export function useUser(userId: number | null) {
  const [user, setUser] = useAtom(selectedUserAtom);
  const [loading, setLoading] = useAtom(usersLoadingAtom);
  const [error, setError] = useAtom(usersErrorAtom);
  const { handleError, clearError } = useError();

  useEffect(() => {
    if (!userId || isNaN(userId)) {
      setUser(null);
      setError(null);
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserById(userId);
        setUser(data);
      } catch (err) {
        const errorObj = err as any;
        setError(errorObj);
        handleError(err, { showToast: true });
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId, setUser, setLoading, setError, handleError]);

  const refetch = async () => {
    if (!userId || isNaN(userId)) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getUserById(userId);
      setUser(data);
    } catch (err) {
      const errorObj = err as any;
      setError(errorObj);
      handleError(err, { showToast: true });
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    refetch,
    clearError,
  };
}

