/**
 * Users Page Atoms
 * State management for Users using Jotai
 * Extends base atoms from services/atoms/baseAtoms
 */

import { atom } from "jotai";
import { XHRError } from "../../../services/api/xhr";
import { User } from "../../../services/atoms/baseAtoms";

// Re-export User interface for convenience
export type { User };

// Users list
export const usersListAtom = atom<User[]>([]);

// Selected user
export const selectedUserAtom = atom<User | null>(null);

// Current authenticated user
export const currentUserAtom = atom<User | null>(null);

// Loading and error states
export const usersLoadingAtom = atom<boolean>(false);
export const usersErrorAtom = atom<XHRError | null>(null);

// Current user loading state
export const currentUserLoadingAtom = atom<boolean>(false);
export const currentUserErrorAtom = atom<XHRError | null>(null);

// User filters
export interface UserFilters {
  search?: string;
  role?: string;
  is_active?: boolean;
}

export const userFiltersAtom = atom<UserFilters>({});

// Derived atoms
export const usersCountAtom = atom((get) => {
  const users = get(usersListAtom);
  return users.length;
});

export const usersHasItemsAtom = atom((get) => {
  const users = get(usersListAtom);
  return users.length > 0;
});

export const isAuthenticatedAtom = atom((get) => {
  const currentUser = get(currentUserAtom);
  return currentUser !== null;
});

// Get user by ID (derived)
export const getUserByIdAtom = atom((get) => (id: number): User | null => {
  const users = get(usersListAtom);
  return users.find((user) => user.id === id) || null;
});

