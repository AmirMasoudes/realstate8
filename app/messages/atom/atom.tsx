/**
 * Messages Page Atoms
 * State management for Messages using Jotai
 * Extends base atoms from services/atoms/baseAtoms
 */

import { atom } from "jotai";
import { XHRError } from "../../../services/api/xhr";
import { Message } from "../../../services/atoms/baseAtoms";

// Re-export Message interface for convenience
export type { Message };

// Messages list
export const messagesListAtom = atom<Message[]>([]);

// Selected message
export const selectedMessageAtom = atom<Message | null>(null);

// Loading and error states
export const messagesLoadingAtom = atom<boolean>(false);
export const messagesErrorAtom = atom<XHRError | null>(null);

// Unread messages count
export const unreadMessagesCountAtom = atom<number>(0);

// Message filters
export interface MessageFilters {
  read?: boolean;
  sender_id?: number;
  receiver_id?: number;
  property_id?: number;
}

export const messageFiltersAtom = atom<MessageFilters>({});

// Derived atoms
export const messagesCountAtom = atom((get) => {
  const messages = get(messagesListAtom);
  return messages.length;
});

export const messagesHasItemsAtom = atom((get) => {
  const messages = get(messagesListAtom);
  return messages.length > 0;
});

export const unreadMessagesAtom = atom((get) => {
  const messages = get(messagesListAtom);
  return messages.filter((msg) => !msg.read);
});

export const readMessagesAtom = atom((get) => {
  const messages = get(messagesListAtom);
  return messages.filter((msg) => msg.read);
});

// Get message by ID (derived)
export const getMessageByIdAtom = atom((get) => (id: number): Message | null => {
  const messages = get(messagesListAtom);
  return messages.find((msg) => msg.id === id) || null;
});

