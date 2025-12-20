/**
 * Custom Hook for Properties Page
 * Manages fetching filtered properties and state management
 */

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  filteredPropertiesAtom,
  filtersAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
  paginationAtom,
} from "../atom/atom";
import { getFilteredProperties, FilterParams } from "../api/getFilteredProperties";
import { useError } from "../../../services/err/useError";

export function useFilteredProperties() {
  const [filteredProperties, setFilteredProperties] = useAtom(filteredPropertiesAtom);
  const [filters, setFilters] = useAtom(filtersAtom);
  const [loading, setLoading] = useAtom(propertiesLoadingAtom);
  const [error, setError] = useAtom(propertiesErrorAtom);
  const [pagination, setPagination] = useAtom(paginationAtom);
  const { handleError, clearError } = useError();

  useEffect(() => {
    const fetchFilteredProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getFilteredProperties(filters);
        setFilteredProperties(response.results);
        setPagination({
          count: response.count,
          next: response.next,
          previous: response.previous,
          page: response.page,
          total_pages: response.total_pages,
        });
      } catch (err: any) {
        setError(err);
        handleError(err, { showToast: true });
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProperties();
  }, [filters, setFilteredProperties, setLoading, setError, setPagination, handleError]);

  const updateFilters = (newFilters: Partial<FilterParams>) => {
    setFilters({ ...filters, ...newFilters });
  };

  const resetFilters = () => {
    setFilters({});
  };

  const goToNextPage = () => {
    if (pagination.next) {
      const url = new URL(pagination.next);
      const page = url.searchParams.get("page");
      setFilters({ ...filters, page: page ? Number(page) : undefined });
    }
  };

  const goToPreviousPage = () => {
    if (pagination.previous) {
      const url = new URL(pagination.previous);
      const page = url.searchParams.get("page");
      setFilters({ ...filters, page: page ? Number(page) : undefined });
    }
  };

  return {
    filteredProperties,
    filters,
    loading,
    error,
    pagination,
    updateFilters,
    resetFilters,
    goToNextPage,
    goToPreviousPage,
    clearError,
  };
}

