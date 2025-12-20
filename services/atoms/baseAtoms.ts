/**
 * Jotai Atoms - Base State Management
 * All shared state should be defined here
 * Organized by module
 */

import { atom } from "jotai";
import { Property } from "../base/atoms";
import { XHRError } from "../api/xhr";

// ==================== Properties Module ====================

export const propertiesListAtom = atom<Property[]>([]);
export const selectedPropertyAtom = atom<Property | null>(null);
export const propertiesLoadingAtom = atom<boolean>(false);
export const propertiesErrorAtom = atom<XHRError | null>(null);
export const featuredPropertiesAtom = atom<Property[]>([]);
export const filteredPropertiesAtom = atom<Property[]>([]);
export const propertiesPaginationAtom = atom<{
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}>({
  page: 1,
  limit: 12,
  total: 0,
  totalPages: 1,
});

// ==================== Users Module ====================

export interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  avatar?: string;
  [key: string]: any;
}

export const usersListAtom = atom<User[]>([]);
export const selectedUserAtom = atom<User | null>(null);
export const currentUserAtom = atom<User | null>(null);
export const usersLoadingAtom = atom<boolean>(false);
export const usersErrorAtom = atom<XHRError | null>(null);

// ==================== Auth Module ====================

export const isAuthenticatedAtom = atom<boolean>(false);
export const authTokenAtom = atom<string | null>(null);
export const authLoadingAtom = atom<boolean>(false);
export const authErrorAtom = atom<XHRError | null>(null);

// ==================== Categories Module ====================

export interface Category {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  [key: string]: any;
}

export const categoriesListAtom = atom<Category[]>([]);
export const selectedCategoryAtom = atom<Category | null>(null);
export const categoriesLoadingAtom = atom<boolean>(false);
export const categoriesErrorAtom = atom<XHRError | null>(null);

// ==================== Bookmarks Module ====================

export interface Bookmark {
  id: number;
  property_id: number;
  property?: Property;
  created_at?: string;
  [key: string]: any;
}

export const bookmarksListAtom = atom<Bookmark[]>([]);
export const bookmarksLoadingAtom = atom<boolean>(false);
export const bookmarksErrorAtom = atom<XHRError | null>(null);
export const bookmarkedPropertyIdsAtom = atom<number[]>([]);

// ==================== Messages Module ====================

export interface Message {
  id: number;
  sender_id?: number;
  receiver_id?: number;
  subject?: string;
  content: string;
  read?: boolean;
  created_at?: string;
  [key: string]: any;
}

export const messagesListAtom = atom<Message[]>([]);
export const selectedMessageAtom = atom<Message | null>(null);
export const messagesLoadingAtom = atom<boolean>(false);
export const messagesErrorAtom = atom<XHRError | null>(null);
export const unreadMessagesCountAtom = atom<number>(0);

// ==================== Images Module ====================

export interface Image {
  id: number;
  url: string;
  alt?: string;
  property_id?: number;
  [key: string]: any;
}

export const imagesListAtom = atom<Image[]>([]);
export const imagesLoadingAtom = atom<boolean>(false);
export const imagesErrorAtom = atom<XHRError | null>(null);
export const uploadProgressAtom = atom<number>(0);

// ==================== UI State Atoms ====================

export const mobileMenuOpenAtom = atom<boolean>(false);
export const sidebarOpenAtom = atom<boolean>(false);
export const searchQueryAtom = atom<string>("");
export const filtersAtom = atom<{
  minPrice: number | null;
  maxPrice: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  propertyType: string | null;
  category: number | null;
  location: string | null;
}>({
  minPrice: null,
  maxPrice: null,
  bedrooms: null,
  bathrooms: null,
  propertyType: null,
  category: null,
  location: null,
});

// ==================== Form State Atoms ====================

export const formErrorsAtom = atom<Record<string, string>>({});
export const formSubmittingAtom = atom<boolean>(false);
export const formSuccessAtom = atom<boolean>(false);

// ==================== Pagination Atoms ====================

export const currentPageAtom = atom<number>(1);
export const totalPagesAtom = atom<number>(1);
export const itemsPerPageAtom = atom<number>(12);

// ==================== Global Loading & Error ====================

export const globalLoadingAtom = atom<boolean>(false);
export const globalErrorAtom = atom<string | null>(null);

// ==================== Derived Atoms ====================

// Filtered properties based on search and filters
export const filteredPropertiesWithSearchAtom = atom((get) => {
  const properties = get(propertiesListAtom);
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
  if (filters.minPrice !== null) {
    filtered = filtered.filter((prop) => {
      const propPrice = parseFloat(
        String(prop.price || 0).replace(/[^0-9.]/g, "")
      );
      return propPrice >= filters.minPrice!;
    });
  }

  if (filters.maxPrice !== null) {
    filtered = filtered.filter((prop) => {
      const propPrice = parseFloat(
        String(prop.price || 0).replace(/[^0-9.]/g, "")
      );
      return propPrice <= filters.maxPrice!;
    });
  }

  if (filters.bedrooms !== null) {
    filtered = filtered.filter(
      (prop) => prop.bedrooms && prop.bedrooms >= filters.bedrooms!
    );
  }

  if (filters.bathrooms !== null) {
    filtered = filtered.filter(
      (prop) => prop.bathrooms && prop.bathrooms >= filters.bathrooms!
    );
  }

  if (filters.propertyType) {
    filtered = filtered.filter(
      (prop) => prop.type === filters.propertyType
    );
  }

  if (filters.category !== null) {
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

// Check if property is bookmarked
export const isPropertyBookmarkedAtom = atom((get) => (propertyId: number): boolean => {
  const bookmarkedIds = get(bookmarkedPropertyIdsAtom);
  return bookmarkedIds.includes(propertyId);
});

