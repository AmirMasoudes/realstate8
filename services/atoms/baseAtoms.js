/**
 * Jotai Atoms - Base State Management
 * All shared state should be defined here
 * Organized by module
 */

import { atom } from "jotai";

// ==================== Properties Module ====================

export const propertiesListAtom = atom([]);
export const selectedPropertyAtom = atom(null);
export const propertiesLoadingAtom = atom(false);
export const propertiesErrorAtom = atom(null);
export const featuredPropertiesAtom = atom([]);
export const filteredPropertiesAtom = atom([]);
export const propertiesPaginationAtom = atom({
  page: 1,
  limit: 12,
  total: 0,
  totalPages: 1,
});

// ==================== Users Module ====================

export const usersListAtom = atom([]);
export const selectedUserAtom = atom(null);
export const currentUserAtom = atom(null);
export const usersLoadingAtom = atom(false);
export const usersErrorAtom = atom(null);

// ==================== Auth Module ====================

export const isAuthenticatedAtom = atom(false);
export const authTokenAtom = atom(null);
export const authLoadingAtom = atom(false);
export const authErrorAtom = atom(null);

// ==================== Categories Module ====================

export const categoriesListAtom = atom([]);
export const selectedCategoryAtom = atom(null);
export const categoriesLoadingAtom = atom(false);
export const categoriesErrorAtom = atom(null);

// ==================== Bookmarks Module ====================

export const bookmarksListAtom = atom([]);
export const bookmarksLoadingAtom = atom(false);
export const bookmarksErrorAtom = atom(null);
export const bookmarkedPropertyIdsAtom = atom([]);

// ==================== Messages Module ====================

export const messagesListAtom = atom([]);
export const selectedMessageAtom = atom(null);
export const messagesLoadingAtom = atom(false);
export const messagesErrorAtom = atom(null);
export const unreadMessagesCountAtom = atom(0);

// ==================== Images Module ====================

export const imagesListAtom = atom([]);
export const imagesLoadingAtom = atom(false);
export const imagesErrorAtom = atom(null);
export const uploadProgressAtom = atom(0);

// ==================== UI State Atoms ====================

export const mobileMenuOpenAtom = atom(false);
export const sidebarOpenAtom = atom(false);
export const searchQueryAtom = atom("");
export const filtersAtom = atom({
  minPrice: null,
  maxPrice: null,
  bedrooms: null,
  bathrooms: null,
  propertyType: null,
  category: null,
  location: null,
});

// ==================== Form State Atoms ====================

export const formErrorsAtom = atom({});
export const formSubmittingAtom = atom(false);
export const formSuccessAtom = atom(false);

// ==================== Pagination Atoms ====================

export const currentPageAtom = atom(1);
export const totalPagesAtom = atom(1);
export const itemsPerPageAtom = atom(12);

// ==================== Global Loading & Error ====================

export const globalLoadingAtom = atom(false);
export const globalErrorAtom = atom(null);

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
  if (filters.minPrice) {
    filtered = filtered.filter((prop) => {
      const propPrice = parseFloat(
        String(prop.price || 0).replace(/[^0-9.]/g, "")
      );
      return propPrice >= filters.minPrice;
    });
  }

  if (filters.maxPrice) {
    filtered = filtered.filter((prop) => {
      const propPrice = parseFloat(
        String(prop.price || 0).replace(/[^0-9.]/g, "")
      );
      return propPrice <= filters.maxPrice;
    });
  }

  if (filters.bedrooms) {
    filtered = filtered.filter(
      (prop) => prop.bedrooms && prop.bedrooms >= filters.bedrooms
    );
  }

  if (filters.bathrooms) {
    filtered = filtered.filter(
      (prop) => prop.bathrooms && prop.bathrooms >= filters.bathrooms
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
        prop.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  return filtered;
});

// Check if property is bookmarked
export const isPropertyBookmarkedAtom = atom((get) => (propertyId) => {
  const bookmarkedIds = get(bookmarkedPropertyIdsAtom);
  return bookmarkedIds.includes(propertyId);
});

