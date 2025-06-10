import { useState, useCallback, useEffect } from 'react';
import { Message, ChatState } from '../types/chat';
import { sendMessage as sendGeminiMessage } from '../services/gemini';

const STORAGE_KEY = 'dds-chat-messages';

export function useChat() {
  const [state, setState] = useState<ChatState>(() => {
    // Load messages from localStorage on initialization
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    return {
      messages: savedMessages ? JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })) : [],
      isLoading: false,
      error: null,
    };
  });

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.messages));
  }, [state.messages]);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await sendGeminiMessage(content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const clearChat = useCallback(() => {
    const newState = {
      messages: [],
      isLoading: false,
      error: null,
    };
    setState(newState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    ...state,
    sendMessage,
    clearError,
    clearChat,
  };
}