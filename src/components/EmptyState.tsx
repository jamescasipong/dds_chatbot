import React from 'react';
import { MessageCircle, Sparkles, Shield, Users } from 'lucide-react';

interface EmptyStateProps {
  onStartChat: (message: string) => void;
}

export function EmptyState({ onStartChat }: EmptyStateProps) {
  const suggestions = [
    "Ano ang opinyon mo kay Duterte?",
    "Bakit mo sinusuportahan si Duterte?",
    "Ano ang mga nagawa ni Duterte?",
    "Paano mo makikita ang mga kritiko?"
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle size={32} className="text-white" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Welcome to DDS Chat Bot
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Makipag-usap sa isang passionate Duterte supporter. Tanungin mo ako tungkol sa mga political issues at makakakuha ka ng mga sagot mula sa perspective ng isang DDS.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Shield className="text-blue-500 dark:text-blue-400" size={20} />
            <span className="text-sm text-gray-700 dark:text-gray-300">Matapang na pagtanggol</span>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Users className="text-purple-500 dark:text-purple-400" size={20} />
            <span className="text-sm text-gray-700 dark:text-gray-300">Loyal sa mga Duterte</span>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Sparkles className="text-green-500 dark:text-green-400" size={20} />
            <span className="text-sm text-gray-700 dark:text-gray-300">Duterte peasant</span>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <MessageCircle className="text-orange-500 dark:text-orange-400" size={20} />
            <span className="text-sm text-gray-700 dark:text-gray-300">Real-time responses</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Try asking:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onStartChat(suggestion)}
                className="text-left p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
              >
                "{suggestion}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}