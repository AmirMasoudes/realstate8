/**
 * Categories Page Atoms
 * State management for Categories using Jotai
 * Extends base atoms from services/atoms/baseAtoms
 */

import { atom } from "jotai";
import { XHRError } from "../../../services/api/xhr";
import { Category } from "../../../services/atoms/baseAtoms";

// Re-export Category interface for convenience
export type { Category };

// Categories list
export const categoriesListAtom = atom<Category[]>([]);

// Selected category
export const selectedCategoryAtom = atom<Category | null>(null);

// Loading and error states
export const categoriesLoadingAtom = atom<boolean>(false);
export const categoriesErrorAtom = atom<XHRError | null>(null);

// Derived atoms
export const categoriesCountAtom = atom((get) => {
  const categories = get(categoriesListAtom);
  return categories.length;
});

export const categoriesHasItemsAtom = atom((get) => {
  const categories = get(categoriesListAtom);
  return categories.length > 0;
});

// Get category by ID (derived)
export const getCategoryByIdAtom = atom((get) => (id: number): Category | null => {
  const categories = get(categoriesListAtom);
  return categories.find((cat) => cat.id === id) || null;
});

