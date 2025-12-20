/**
 * Custom Hook for Bookmarks Page
 * Manages fetching bookmarks and state management
 */

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  bookmarksListAtom,
  bookmarkedPropertiesAtom,
  bookmarkedPropertyIdsAtom,
  bookmarksLoadingAtom,
  bookmarksErrorAtom,
} from "../atom/atom";
import { getBookmarks } from "../api/getBookmarks";
import { Bookmark } from "../../../services/atoms/baseAtoms";
import { useError } from "../../../services/err/useError";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useAtom(bookmarksListAtom);
  const [bookmarkedProperties, setBookmarkedProperties] = useAtom(bookmarkedPropertiesAtom);
  const [bookmarkedIds, setBookmarkedIds] = useAtom(bookmarkedPropertyIdsAtom);
  const [loading, setLoading] = useAtom(bookmarksLoadingAtom);
  const [error, setError] = useAtom(bookmarksErrorAtom);
  const { handleError, clearError } = useError();

  useEffect(() => {
    const loadBookmarks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getBookmarks();
        const bookmarksList: Bookmark[] = Array.isArray(response)
          ? response
          : (response as any).results || [];
        
        setBookmarks(bookmarksList);
        
        // Extract properties from bookmarks
        const properties = bookmarksList
          .map((bookmark) => bookmark.property)
          .filter((prop) => prop !== undefined) as any[];
        
        setBookmarkedProperties(properties);
        
        // Extract property IDs
        const ids = bookmarksList
          .map((bookmark) => bookmark.property_id || bookmark.property?.id)
          .filter((id) => id !== undefined) as number[];
        
        setBookmarkedIds(ids);
      } catch (err) {
        const errorObj = err as any;
        setError(errorObj);
        handleError(err, { showToast: true });
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
  }, [setBookmarks, setBookmarkedProperties, setBookmarkedIds, setLoading, setError, handleError]);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBookmarks();
      const bookmarksList: Bookmark[] = Array.isArray(response)
        ? response
        : (response as any).results || [];
      
      setBookmarks(bookmarksList);
      
      const properties = bookmarksList
        .map((bookmark) => bookmark.property)
        .filter((prop) => prop !== undefined) as any[];
      
      setBookmarkedProperties(properties);
      
      const ids = bookmarksList
        .map((bookmark) => bookmark.property_id || bookmark.property?.id)
        .filter((id) => id !== undefined) as number[];
      
      setBookmarkedIds(ids);
    } catch (err) {
      const errorObj = err as any;
      setError(errorObj);
      handleError(err, { showToast: true });
    } finally {
      setLoading(false);
    }
  };

  return {
    bookmarks,
    bookmarkedProperties,
    bookmarkedIds,
    loading,
    error,
    refetch,
    clearError,
  };
}

