import React from 'react';
import { Settings, Accessibility, Bell } from 'lucide-react';

interface ChatHeaderProps {
  onToggleAccessibilityPanel: () => void;
  unreadAlerts: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onToggleAccessibilityPanel, unreadAlerts }) => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">BankAssist</h1>
        <span className="ml-2 text-sm bg-blue-500 px-2 py-0.5 rounded">AI Banking Assistant</span>
      </div>
      
      <div className="flex items-center space-x-3">
        <button
          className="relative p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadAlerts > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadAlerts}
            </span>
          )}
        </button>
        
        <button
          onClick={onToggleAccessibilityPanel}
          className="p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Accessibility settings"
        >
          <Accessibility className="w-5 h-5" />
        </button>
        
        <button
          className="p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;