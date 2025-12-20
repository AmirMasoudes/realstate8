/**
 * Custom Hook for Users
 * Manages fetching users and state management
 */

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  usersListAtom,
  usersLoadingAtom,
  usersErrorAtom,
  userFiltersAtom,
  type UserFilters,
} from "../atom/atom";
import { getUsers, GetUsersParams } from "../api/getUsers";
import { User } from "../atom/atom";
import { useError } from "../../../services/err/useError";

export function useUsers(params?: GetUsersParams) {
  const [users, setUsers] = useAtom(usersListAtom);
  const [loading, setLoading] = useAtom(usersLoadingAtom);
  const [error, setError] = useAtom(usersErrorAtom);
  const [filters, setFilters] = useAtom(userFiltersAtom);
  const { handleError, clearError } = useError();

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        // Merge params with filters
        const queryParams: GetUsersParams = {
          ...params,
          ...filters,
        };

        const response = await getUsers(queryParams);
        // Handle both array and paginated response
        const usersList: User[] = Array.isArray(response)
          ? response
          : (response as any).results || [];
        
        setUsers(usersList);
      } catch (err) {
        const errorObj = err as any;
        setError(errorObj);
        handleError(err, { showToast: true });
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [params, filters, setUsers, setLoading, setError, handleError]);

  const refetch = async (newParams?: GetUsersParams) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams: GetUsersParams = {
        ...newParams || params,
        ...filters,
      };

      const response = await getUsers(queryParams);
      const usersList: User[] = Array.isArray(response)
        ? response
        : (response as any).results || [];
      
      setUsers(usersList);
    } catch (err) {
      const errorObj = err as any;
      setError(errorObj);
      handleError(err, { showToast: true });
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<UserFilters>) => {
    setFilters({ ...filters, ...newFilters });
  };

  const resetFilters = () => {
    setFilters({});
  };

  return {
    users,
    loading,
    error,
    filters,
    refetch,
    updateFilters,
    resetFilters,
    clearError,
  };
}

