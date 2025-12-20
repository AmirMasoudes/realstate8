/**
 * Map Page Atoms
 * State management for Map page using Jotai
 * Extends base atoms from services/atoms/propertiesAtom
 */

import { atom } from "jotai";
import {
  filteredPropertiesAtom,
  filtersAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
  selectedPropertyIdAtom,
  paginationAtom,
} from "../../../services/atoms/propertiesAtom";
import { Property } from "../../../services/base/atoms";

// Re-export base atoms for convenience
export {
  filteredPropertiesAtom,
  filtersAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
  selectedPropertyIdAtom,
  paginationAtom,
};

// Map-specific atoms
export interface MapViewState {
  center: [number, number];
  zoom: number;
  userLocation?: { lat: number; lng: number; city?: string };
}

export const mapViewStateAtom = atom<MapViewState>({
  center: [51.3890, 35.6892], // Tehran default
  zoom: 11,
});

export const mapIsLoadingLocationAtom = atom<boolean>(true);
export const mapLocationErrorAtom = atom<string | null>(null);

// Map UI state
export const mapSidebarOpenAtom = atom<boolean>(true);
export const mapFiltersExpandedAtom = atom<boolean>(true);

// Derived atoms
export const mapHasPropertiesAtom = atom((get) => {
  const properties = get(filteredPropertiesAtom);
  return properties.length > 0;
});

export const mapPropertiesCountAtom = atom((get) => {
  const pagination = get(paginationAtom);
  return pagination.count;
});

