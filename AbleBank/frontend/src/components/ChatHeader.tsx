import React from 'react';
import { SettingsIcon, BellIcon } from '@heroicons/react/24/outline';

interface ChatHeaderProps {
  onToggleAccessibilityPanel: () => void;
  unreadAlerts: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  onToggleAccessibilityPanel,
  unreadAlerts
}) => {
  return (
    <header className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Banking Assistant</h1>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleAccessibilityPanel}
            className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label="Accessibility settings"
          >
            <SettingsIcon className="h-6 w-6" />
          </button>
          
          <div className="relative">
            <button
              className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label="Notifications"
            >
              <BellIcon className="h-6 w-6" />
              {unreadAlerts > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {unreadAlerts}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;