import React from 'react';
import { UserProfile } from '../types';
import { Moon, Sun, Type, Globe } from 'lucide-react';

interface AccessibilityPanelProps {
  userProfile: UserProfile;
  onUpdateProfile: (updatedProfile: Partial<UserProfile>) => void;
  isOpen: boolean;
  onClose: () => void;
}

const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({
  userProfile,
  onUpdateProfile,
  isOpen,
  onClose
}) => {
  const { highContrastMode, fontSize, preferredLanguage } = userProfile;
  
  const handleContrastToggle = () => {
    onUpdateProfile({ highContrastMode: !highContrastMode });
  };
  
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateProfile({ fontSize: parseInt(e.target.value) });
  };
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateProfile({ preferredLanguage: e.target.value });
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Accessibility Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size: {userProfile.fontSize}px
            </label>
            <input
              type="range"
              min="12"
              max="24"
              value={userProfile.fontSize}
              onChange={handleFontSizeChange}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="highContrast"
              checked={userProfile.highContrastMode}
              onChange={handleContrastToggle}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="highContrast"
              className="ml-2 block text-sm text-gray-700"
            >
              High Contrast Mode
            </label>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Language</h3>
            <div className="flex items-center p-3 bg-gray-100 rounded-lg">
              <Globe className="w-5 h-5 mr-2 flex-shrink-0" />
              <select
                value={preferredLanguage}
                onChange={handleLanguageChange}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2"
                aria-label="Select language"
              >
                <option value="English">English</option>
                <option value="Spanish">Español</option>
                <option value="French">Français</option>
                <option value="German">Deutsch</option>
                <option value="Chinese">中文</option>
                <option value="Arabic">العربية</option>
              </select>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Voice Input & Output</h3>
            <div className="p-3 bg-gray-100 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span>Voice Input</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={true}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>Voice Output</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={true}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPanel;