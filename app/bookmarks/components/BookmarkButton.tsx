/**
 * Example Component: Bookmark Button
 * Demonstrates adding/removing bookmarks
 */

"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  bookmarkedPropertyIdsAtom,
  bookmarksLoadingAtom,
  bookmarksErrorAtom,
} from "@/services/atoms/baseAtoms";
import { addBookmark } from "../api/addBookmark";
import { removeBookmark } from "../api/removeBookmark";
import { getBookmarks } from "../api/getBookmarks";
import { Bookmark } from "@/services/atoms/baseAtoms";
import { XHRError } from "@/services/api/xhr";

interface BookmarkButtonProps {
  propertyId: number;
}

export default function BookmarkButton({ propertyId }: BookmarkButtonProps) {
  const [bookmarkedIds, setBookmarkedIds] = useAtom(bookmarkedPropertyIdsAtom);
  const [loading, setLoading] = useAtom(bookmarksLoadingAtom);
  const [error, setError] = useAtom(bookmarksErrorAtom);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [bookmarkId, setBookmarkId] = useState<number | null>(null);

  useEffect(() => {
    // Check if property is already bookmarked
    const checkBookmark = async () => {
      try {
        const bookmarksResponse = await getBookmarks();
        const bookmarks: Bookmark[] = Array.isArray(bookmarksResponse)
          ? bookmarksResponse
          : (bookmarksResponse as any).results || [];
        
        const bookmark = bookmarks.find(
          (b) => b.property_id === propertyId || b.property?.id === propertyId
        );
        if (bookmark) {
          setIsBookmarked(true);
          setBookmarkId(bookmark.id);
          if (!bookmarkedIds.includes(propertyId)) {
            setBookmarkedIds([...bookmarkedIds, propertyId]);
          }
        }
      } catch (err) {
        console.error("Failed to check bookmarks:", err);
      }
    };

    checkBookmark();
  }, [propertyId, bookmarkedIds, setBookmarkedIds]);

  const handleToggleBookmark = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isBookmarked) {
        // Remove bookmark
        if (bookmarkId) {
          await removeBookmark(bookmarkId);
        }
        setIsBookmarked(false);
        setBookmarkId(null);
        setBookmarkedIds(bookmarkedIds.filter((id) => id !== propertyId));
      } else {
        // Add bookmark
        const response = await addBookmark(propertyId);
        setIsBookmarked(true);
        setBookmarkId(response.id);
        setBookmarkedIds([...bookmarkedIds, propertyId]);
      }
    } catch (err: unknown) {
      const errorObj = err as XHRError;
      setError({
        message: errorObj.details?.message || errorObj.message || "خطا در ذخیره نشان‌گذاری",
        status: errorObj.status || 0,
        details: errorObj.details,
        raw: errorObj.raw,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleBookmark}
      disabled={loading}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isBookmarked
          ? "bg-yellow-500 text-white hover:bg-yellow-600"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading
        ? "در حال پردازش..."
        : isBookmarked
        ? "★ نشان‌گذاری شده"
        : "☆ نشان‌گذاری"}
    </button>
  );
}

