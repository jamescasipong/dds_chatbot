import React from 'react';
import { MessageCircle, Settings, Moon, Sun, Plus } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ChatHeaderProps {
  onNewChat: () => void;
  hasMessages: boolean;
}

export function ChatHeader({ onNewChat, hasMessages }: ChatHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <MessageCircle size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">DDS Chat Bot</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Powered by Gemini AI</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {hasMessages && (
            <button 
              onClick={onNewChat}
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
              title="Start new conversation"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">New Chat</span>
            </button>
          )}
          
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon size={20} className="text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun size={20} className="text-gray-600 dark:text-gray-400" />
            )}
          </button>
          
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <Settings size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}