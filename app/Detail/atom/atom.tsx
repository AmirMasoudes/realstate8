/**
 * Detail Page Atoms
 * State management for Property Detail page using Jotai
 * Extends base atoms from services/atoms/propertiesAtom
 */

import { atom } from "jotai";
import { XHRError } from "../../../services/api/xhr";
import { Property } from "../../../services/base/atoms";
import { selectedPropertyAtom } from "../../../services/atoms/propertiesAtom";

// Re-export base atom for convenience
export { selectedPropertyAtom };

// Detail page specific atoms
export const detailPropertyAtom = atom<Property | null>(null);
export const detailLoadingAtom = atom<boolean>(false);
export const detailErrorAtom = atom<XHRError | null>(null);

// Detail page UI state
export const detailImagesExpandedAtom = atom<boolean>(false);
export const detailContactFormOpenAtom = atom<boolean>(false);

// Derived atoms
export const detailHasPropertyAtom = atom((get) => {
  const property = get(detailPropertyAtom);
  return property !== null;
});

export const detailPropertyIdAtom = atom((get) => {
  const property = get(detailPropertyAtom);
  return property?.id || null;
});

