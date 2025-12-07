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
  title?: string;
  area: number; // in square meters
  bedrooms: number;
  price: number; // price value
  currency?: string; // e.g., "Toman"
  primary_image?: string | null; // Main property image
  // Optional fields
  location?: string;
  city_name?: string; // City name
  neighborhood?: string; // Neighborhood name
  latitude?: number; // Geographic latitude
  longitude?: number; // Geographic longitude
  bathrooms?: number;
  image?: string; // Legacy field
  description?: string;
  type?: string;
  status?: "available" | "sold" | "rented";
  category_id?: number;
  created_at?: string;
  updated_at?: string;
}

export const propertiesAtom = atom<Property[]>([]);
export const selectedPropertyAtom = atom<Property | null>(null);
export const filteredPropertiesAtom = atom<Property[]>([]);
export const propertiesLoadingAtom = atom<boolean>(false);
export const propertiesErrorAtom = atom<XHRError | null>(null);

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
  category?: number;
  location?: string;
}>({});

// ==================== User/Auth States ====================
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom<boolean>(false);
export const userLoadingAtom = atom<boolean>(false);
export const userErrorAtom = atom<XHRError | null>(null);

// ==================== Bookmarks ====================
export const bookmarksAtom = atom<number[]>([]);
export const bookmarksLoadingAtom = atom<boolean>(false);
export const bookmarksErrorAtom = atom<XHRError | null>(null);

// ==================== Form States ====================
export const formErrorsAtom = atom<Record<string, string>>({});
export const formSubmittingAtom = atom<boolean>(false);

// ==================== Pagination ====================
export const currentPageAtom = atom<number>(1);
export const totalPagesAtom = atom<number>(1);
export const itemsPerPageAtom = atom<number>(12);

// ==================== About Us ====================
export interface AboutUsData {
  title: string;
  description: string;
  mission?: string;
  vision?: string;
  values?: string[];
  team?: Array<{
    name: string;
    role: string;
    image?: string;
  }>;
}

export const aboutUsAtom = atom<AboutUsData | null>(null);
export const aboutUsLoadingAtom = atom<boolean>(false);
export const aboutUsErrorAtom = atom<XHRError | null>(null);

// ==================== Contact ====================
export const contactSubmittingAtom = atom<boolean>(false);
export const contactErrorAtom = atom<XHRError | null>(null);
export const contactSuccessAtom = atom<boolean>(false);

// ==================== Derived Atoms ====================
// Example: Filtered properties based on search and filters
export const filteredPropertiesWithSearchAtom = atom((get) => {
  const properties = get(propertiesAtom);
  const searchQuery = get(searchQueryAtom).toLowerCase();
  const filters = get(filtersAtom);

  let filtered = [...properties];

  // Apply search
  if (searchQuery) {
    filtered = filtered.filter(
      (prop) =>
        (prop.title && prop.title.toLowerCase().includes(searchQuery)) ||
        (prop.location && prop.location.toLowerCase().includes(searchQuery)) ||
        (prop.description && prop.description.toLowerCase().includes(searchQuery))
    );
  }

  // Apply filters
  if (filters.minPrice) {
    filtered = filtered.filter((prop) => {
      const propPrice = parseFloat(
        String(prop.price || 0).replace(/[^0-9.]/g, "")
      );
      return propPrice >= filters.minPrice!;
    });
  }

  if (filters.maxPrice) {
    filtered = filtered.filter((prop) => {
      const propPrice = parseFloat(
        String(prop.price || 0).replace(/[^0-9.]/g, "")
      );
      return propPrice <= filters.maxPrice!;
    });
  }

  if (filters.bedrooms) {
    filtered = filtered.filter(
      (prop) => prop.bedrooms && prop.bedrooms >= filters.bedrooms!
    );
  }

  if (filters.bathrooms) {
    filtered = filtered.filter(
      (prop) => prop.bathrooms && prop.bathrooms >= filters.bathrooms!
    );
  }

  if (filters.propertyType) {
    filtered = filtered.filter(
      (prop) => prop.type === filters.propertyType
    );
  }

  if (filters.category) {
    filtered = filtered.filter(
      (prop) => prop.category_id === filters.category
    );
  }

  if (filters.location) {
    filtered = filtered.filter(
      (prop) =>
        prop.location &&
        prop.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  return filtered;
});
