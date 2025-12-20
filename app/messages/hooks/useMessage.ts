/**
 * Custom Hook for Single Message
 * Manages fetching a single message by ID
 */

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  selectedMessageAtom,
  messagesLoadingAtom,
  messagesErrorAtom,
} from "../atom/atom";
import { getMessageById } from "../api/getMessageById";
import { Message } from "../atom/atom";
import { useError } from "../../../services/err/useError";

export function useMessage(messageId: number | null) {
  const [message, setMessage] = useAtom(selectedMessageAtom);
  const [loading, setLoading] = useAtom(messagesLoadingAtom);
  const [error, setError] = useAtom(messagesErrorAtom);
  const { handleError, clearError } = useError();

  useEffect(() => {
    if (!messageId || isNaN(messageId)) {
      setMessage(null);
      setError(null);
      setLoading(false);
      return;
    }

    const loadMessage = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMessageById(messageId);
        setMessage(data);
      } catch (err) {
        const errorObj = err as any;
        setError(errorObj);
        handleError(err, { showToast: true });
      } finally {
        setLoading(false);
      }
    };

    loadMessage();
  }, [messageId, setMessage, setLoading, setError, handleError]);

  const refetch = async () => {
    if (!messageId || isNaN(messageId)) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getMessageById(messageId);
      setMessage(data);
    } catch (err) {
      const errorObj = err as any;
      setError(errorObj);
      handleError(err, { showToast: true });
    } finally {
      setLoading(false);
    }
  };

  return {
    message,
    loading,
    error,
    refetch,
    clearError,
  };
}

