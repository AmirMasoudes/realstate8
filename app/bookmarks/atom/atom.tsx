/**
 * Bookmarks Page Atoms
 * State management for Bookmarks page using Jotai
 * Extends base atoms from services/atoms/baseAtoms
 */

import { atom } from "jotai";
import { XHRError } from "../../../services/api/xhr";
import { Property } from "../../../services/base/atoms";
import { Bookmark } from "../../../services/atoms/baseAtoms";

// Bookmarks list
export const bookmarksListAtom = atom<Bookmark[]>([]);
export const bookmarkedPropertiesAtom = atom<Property[]>([]);

// Loading and error states
export const bookmarksLoadingAtom = atom<boolean>(false);
export const bookmarksErrorAtom = atom<XHRError | null>(null);

// Bookmarked property IDs (for quick lookup)
export const bookmarkedPropertyIdsAtom = atom<number[]>([]);

// Derived atoms
export const bookmarksCountAtom = atom((get) => {
  const bookmarks = get(bookmarksListAtom);
  return bookmarks.length;
});

export const bookmarksHasItemsAtom = atom((get) => {
  const bookmarks = get(bookmarksListAtom);
  return bookmarks.length > 0;
});

// Check if property is bookmarked
export const isPropertyBookmarkedAtom = atom((get) => (propertyId: number): boolean => {
  const bookmarkedIds = get(bookmarkedPropertyIdsAtom);
  return bookmarkedIds.includes(propertyId);
});

