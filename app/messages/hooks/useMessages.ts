/**
 * Custom Hook for Messages
 * Manages fetching messages and state management
 */

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  messagesListAtom,
  messagesLoadingAtom,
  messagesErrorAtom,
  unreadMessagesCountAtom,
  messageFiltersAtom,
  type MessageFilters,
} from "../atom/atom";
import { getMessages, GetMessagesParams } from "../api/getMessages";
import { Message } from "../atom/atom";
import { useError } from "../../../services/err/useError";

export function useMessages(params?: GetMessagesParams) {
  const [messages, setMessages] = useAtom(messagesListAtom);
  const [loading, setLoading] = useAtom(messagesLoadingAtom);
  const [error, setError] = useAtom(messagesErrorAtom);
  const [filters, setFilters] = useAtom(messageFiltersAtom);
  const [unreadCount, setUnreadCount] = useAtom(unreadMessagesCountAtom);
  const { handleError, clearError } = useError();

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        // Merge params with filters
        const queryParams: GetMessagesParams = {
          ...params,
          ...filters,
        };

        const response = await getMessages(queryParams);
        // Handle both array and paginated response
        const messagesList: Message[] = Array.isArray(response)
          ? response
          : (response as any).results || [];
        
        setMessages(messagesList);
        
        // Update unread count
        const unread = messagesList.filter((msg) => !msg.read).length;
        setUnreadCount(unread);
      } catch (err) {
        const errorObj = err as any;
        setError(errorObj);
        handleError(err, { showToast: true });
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [params, filters, setMessages, setLoading, setError, setUnreadCount, handleError]);

  const refetch = async (newParams?: GetMessagesParams) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams: GetMessagesParams = {
        ...newParams || params,
        ...filters,
      };

      const response = await getMessages(queryParams);
      const messagesList: Message[] = Array.isArray(response)
        ? response
        : (response as any).results || [];
      
      setMessages(messagesList);
      
      const unread = messagesList.filter((msg) => !msg.read).length;
      setUnreadCount(unread);
    } catch (err) {
      const errorObj = err as any;
      setError(errorObj);
      handleError(err, { showToast: true });
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<MessageFilters>) => {
    setFilters({ ...filters, ...newFilters });
  };

  const resetFilters = () => {
    setFilters({});
  };

  return {
    messages,
    loading,
    error,
    filters,
    unreadCount,
    refetch,
    updateFilters,
    resetFilters,
    clearError,
  };
}

