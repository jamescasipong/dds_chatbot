import React, { useEffect, useRef, useState } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { EmptyState } from './components/EmptyState';
import { ErrorMessage } from './components/ErrorMessage';
import { NewChatConfirmation } from './components/NewChatConfirmation';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isLoading, error, sendMessage, clearError, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showNewChatConfirmation, setShowNewChatConfirmation] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (message: string) => {
    if (error) clearError();
    sendMessage(message);
  };

  const handleNewChat = () => {
    if (messages.length > 0) {
      setShowNewChatConfirmation(true);
    }
  };

  const confirmNewChat = () => {
    clearChat();
    setShowNewChatConfirmation(false);
  };

  const cancelNewChat = () => {
    setShowNewChatConfirmation(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <ChatHeader onNewChat={handleNewChat} hasMessages={messages.length > 0} />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        {messages.length === 0 && !error ? (
          <EmptyState onStartChat={handleSendMessage} />
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isLoading && (
                <div className="flex gap-3 p-4 bg-white dark:bg-gray-900 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 dark:bg-gray-600 text-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-gray-900 dark:text-white">DDS Bot</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">typing...</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
        
        {error && (
          <ErrorMessage 
            error={error} 
            onRetry={() => clearError()} 
          />
        )}
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      
      <NewChatConfirmation
        isOpen={showNewChatConfirmation}
        onConfirm={confirmNewChat}
        onCancel={cancelNewChat}
      />
    </div>
  );
}

export default App;