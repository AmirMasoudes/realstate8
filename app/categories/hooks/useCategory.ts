/**
 * Custom Hook for Single Category
 * Manages fetching a single category by ID
 */

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  selectedCategoryAtom,
  categoriesLoadingAtom,
  categoriesErrorAtom,
} from "../atom/atom";
import { getCategoryById } from "../api/getCategoryById";
import { Category } from "../atom/atom";
import { useError } from "../../../services/err/useError";

export function useCategory(categoryId: number | null) {
  const [category, setCategory] = useAtom(selectedCategoryAtom);
  const [loading, setLoading] = useAtom(categoriesLoadingAtom);
  const [error, setError] = useAtom(categoriesErrorAtom);
  const { handleError, clearError } = useError();

  useEffect(() => {
    if (!categoryId || isNaN(categoryId)) {
      setCategory(null);
      setError(null);
      setLoading(false);
      return;
    }

    const loadCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCategoryById(categoryId);
        setCategory(data);
      } catch (err) {
        const errorObj = err as any;
        setError(errorObj);
        handleError(err, { showToast: true });
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [categoryId, setCategory, setLoading, setError, handleError]);

  const refetch = async () => {
    if (!categoryId || isNaN(categoryId)) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getCategoryById(categoryId);
      setCategory(data);
    } catch (err) {
      const errorObj = err as any;
      setError(errorObj);
      handleError(err, { showToast: true });
    } finally {
      setLoading(false);
    }
  };

  return {
    category,
    loading,
    error,
    refetch,
    clearError,
  };
}

