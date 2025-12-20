/**
 * Custom Hook for Sending Messages
 * Manages sending messages and state management
 */

import { useState } from "react";
import { useAtom } from "jotai";
import {
  messagesListAtom,
  messagesErrorAtom,
  unreadMessagesCountAtom,
} from "../atom/atom";
import { sendMessage, SendMessageData } from "../api/sendMessage";
import { Message } from "../atom/atom";
import { useError } from "../../../services/err/useError";
import { showSuccessToast } from "../../../services/utils/toastManager";

export function useSendMessage() {
  const [messages, setMessages] = useAtom(messagesListAtom);
  const [error, setError] = useAtom(messagesErrorAtom);
  const [unreadCount, setUnreadCount] = useAtom(unreadMessagesCountAtom);
  const [sending, setSending] = useState(false);
  const { handleError, clearError } = useError();

  const send = async (messageData: SendMessageData): Promise<Message | null> => {
    setSending(true);
    setError(null);

    try {
      const newMessage = await sendMessage(messageData);
      
      // Add to messages list
      setMessages((prev) => [newMessage, ...prev]);
      
      // Update unread count if message is unread
      if (!newMessage.read) {
        setUnreadCount((prev) => prev + 1);
      }
      
      showSuccessToast("پیام با موفقیت ارسال شد");
      return newMessage;
    } catch (err: any) {
      setError(err);
      handleError(err, { showToast: true });
      return null;
    } finally {
      setSending(false);
    }
  };

  return {
    send,
    sending,
    error,
    clearError,
  };
}

