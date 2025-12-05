/**
 * Jotai Atoms
 * All shared state should be defined here
 * Replace useState with these atoms throughout the project
 */

import { atom } from "jotai";
import { XHRError } from "../api/xhr";

// ==================== Loading States ====================
export const loadingAtom = atom<boolean>(false);
export const pageLoadingAtom = atom<boolean>(false);

// ==================== Error States ====================
export const errorAtom = atom<XHRError | null>(null);
export const globalErrorAtom = atom<string | null>(null);

// ==================== Properties ====================
export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image?: string;
  description?: string;
  type?: string;
  status?: "available" | "sold" | "rented";
}

export const propertiesAtom = atom<Property[]>([]);
export const selectedPropertyAtom = atom<Property | null>(null);
export const filteredPropertiesAtom = atom<Property[]>([]);

// ==================== UI States ====================
export const mobileMenuOpenAtom = atom<boolean>(false);
export const sidebarOpenAtom = atom<boolean>(false);
export const searchQueryAtom = atom<string>("");
export const filtersAtom = atom<{
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
}>({});

// ==================== User/Auth States ====================
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom<boolean>(false);

// ==================== Bookmarks ====================
export const bookmarksAtom = atom<number[]>([]);

// ==================== Form States ====================
export const formErrorsAtom = atom<Record<string, string>>({});
export const formSubmittingAtom = atom<boolean>(false);

// ==================== Pagination ====================
export const currentPageAtom = atom<number>(1);
export const totalPagesAtom = atom<number>(1);
export const itemsPerPageAtom = atom<number>(12);

// ==================== Derived Atoms ====================
// Example: Filtered properties based on search and filters
export const filteredPropertiesWithSearchAtom = atom((get) => {
  const properties = get(propertiesAtom);
  const searchQuery = get(searchQueryAtom).toLowerCase();
  const filters = get(filtersAtom);

  let filtered = properties;

  // Apply search
  if (searchQuery) {
    filtered = filtered.filter(
      (prop) =>
        prop.title.toLowerCase().includes(searchQuery) ||
        prop.location.toLowerCase().includes(searchQuery)
    );
  }

  // Apply filters
  if (filters.minPrice) {
    const minPrice = parseFloat(
      filters.minPrice.toString().replace(/[^0-9.]/g, "")
    );
    filtered = filtered.filter((prop) => {
      const propPrice = parseFloat(prop.price.replace(/[^0-9.]/g, ""));
      return propPrice >= minPrice;
    });
  }

  if (filters.maxPrice) {
    const maxPrice = parseFloat(
      filters.maxPrice.toString().replace(/[^0-9.]/g, "")
    );
    filtered = filtered.filter((prop) => {
      const propPrice = parseFloat(prop.price.replace(/[^0-9.]/g, ""));
      return propPrice <= maxPrice;
    });
  }

  if (filters.bedrooms) {
    filtered = filtered.filter((prop) => prop.bedrooms >= filters.bedrooms!);
  }

  if (filters.bathrooms) {
    filtered = filtered.filter((prop) => prop.bathrooms >= filters.bathrooms!);
  }

  if (filters.propertyType) {
    filtered = filtered.filter((prop) => prop.type === filters.propertyType);
  }

  return filtered;
});

