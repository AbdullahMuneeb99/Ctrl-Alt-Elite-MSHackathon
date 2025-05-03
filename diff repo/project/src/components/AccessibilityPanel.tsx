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
  
  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    onUpdateProfile({ fontSize: size });
  };
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateProfile({ preferredLanguage: e.target.value });
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-sm h-full p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Accessibility Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close accessibility panel"
          >
            &times;
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Display</h3>
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
              <div className="flex items-center">
                {highContrastMode ? <Moon className="w-5 h-5 mr-2" /> : <Sun className="w-5 h-5 mr-2" />}
                <span>High Contrast Mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={highContrastMode}
                  onChange={handleContrastToggle}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Text Size</h3>
            <div className="flex items-center p-3 bg-gray-100 rounded-lg">
              <Type className="w-5 h-5 mr-2" />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleFontSizeChange('small')}
                  className={`px-3 py-1 rounded ${
                    fontSize === 'small' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
                  }`}
                >
                  Small
                </button>
                <button
                  onClick={() => handleFontSizeChange('medium')}
                  className={`px-3 py-1 rounded ${
                    fontSize === 'medium' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => handleFontSizeChange('large')}
                  className={`px-3 py-1 rounded ${
                    fontSize === 'large' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
                  }`}
                >
                  Large
                </button>
              </div>
            </div>
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