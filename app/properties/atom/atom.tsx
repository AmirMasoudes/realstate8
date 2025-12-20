/**
 * Properties Page Atoms
 * State management for Properties page using Jotai
 * Extends base atoms from services/atoms/propertiesAtom
 */

import { atom } from "jotai";
import {
  filteredPropertiesAtom,
  filtersAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
  paginationAtom,
} from "../../../services/atoms/propertiesAtom";
import { Property } from "../../../services/base/atoms";
import { FilterParams } from "../api/getFilteredProperties";

// Re-export base atoms for convenience
export {
  filteredPropertiesAtom,
  filtersAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
  paginationAtom,
};

// Properties page specific atoms
export const propertiesViewModeAtom = atom<"grid" | "list">("grid");
export const propertiesSortByAtom = atom<string>("");

// Derived atoms
export const propertiesHasResultsAtom = atom((get) => {
  const properties = get(filteredPropertiesAtom);
  return properties.length > 0;
});

export const propertiesCountAtom = atom((get) => {
  const pagination = get(paginationAtom);
  return pagination.count;
});

export const propertiesHasNextPageAtom = atom((get) => {
  const pagination = get(paginationAtom);
  return !!pagination.next;
});

export const propertiesHasPreviousPageAtom = atom((get) => {
  const pagination = get(paginationAtom);
  return !!pagination.previous;
});

