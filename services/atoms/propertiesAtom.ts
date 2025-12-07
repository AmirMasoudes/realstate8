/**
 * Properties Atom Store
 * Global state management for properties
 */

import { atom } from "jotai";
import { XHRError } from "../api/xhr";
import { Property } from "../base/atoms";
import { FilterParams } from "../../app/properties/api/getFilteredProperties";

// Properties list
export const propertiesListAtom = atom<Property[]>([]);

// Filtered properties list
export const filteredPropertiesAtom = atom<Property[]>([]);

// Filter state
export const filtersAtom = atom<FilterParams>({});

// Loading state
export const propertiesLoadingAtom = atom<boolean>(false);

// Error state
export const propertiesErrorAtom = atom<XHRError | null>(null);

// Selected property
export const selectedPropertyAtom = atom<Property | null>(null);

// Selected property ID (for map/list synchronization)
export const selectedPropertyIdAtom = atom<number | null>(null);

// Pagination
export const paginationAtom = atom<{
  count: number;
  next: string | null;
  previous: string | null;
  page?: number;
  total_pages?: number;
}>({
  count: 0,
  next: null,
  previous: null,
});

// Liked property IDs
export const likedIdsAtom = atom<number[]>([]);

// Like IDs mapping (propertyId -> likeId)
export const likeIdsMapAtom = atom<Record<number, number>>({});

// Like loading state (per property)
export const likeLoadingAtom = atom<Record<number, boolean>>({});

