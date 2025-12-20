/**
 * Custom Hook for Categories
 * Manages fetching categories and state management
 */

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  categoriesListAtom,
  categoriesLoadingAtom,
  categoriesErrorAtom,
} from "../atom/atom";
import { getCategories, GetCategoriesParams } from "../api/getCategories";
import { Category } from "../atom/atom";
import { useError } from "../../../services/err/useError";

export function useCategories(params?: GetCategoriesParams) {
  const [categories, setCategories] = useAtom(categoriesListAtom);
  const [loading, setLoading] = useAtom(categoriesLoadingAtom);
  const [error, setError] = useAtom(categoriesErrorAtom);
  const { handleError, clearError } = useError();

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getCategories(params);
        // Handle both array and paginated response
        const categoriesList: Category[] = Array.isArray(response)
          ? response
          : (response as any).results || [];
        
        setCategories(categoriesList);
      } catch (err) {
        const errorObj = err as any;
        setError(errorObj);
        handleError(err, { showToast: true });
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [params, setCategories, setLoading, setError, handleError]);

  const refetch = async (newParams?: GetCategoriesParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCategories(newParams || params);
      const categoriesList: Category[] = Array.isArray(response)
        ? response
        : (response as any).results || [];
      
      setCategories(categoriesList);
    } catch (err) {
      const errorObj = err as any;
      setError(errorObj);
      handleError(err, { showToast: true });
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    refetch,
    clearError,
  };
}

