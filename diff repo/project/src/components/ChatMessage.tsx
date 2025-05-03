import React from 'react';
import { Message } from '../types';
import { formatTime } from '../utils/helpers';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  isHighContrast: boolean;
  fontSize: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isHighContrast, fontSize }) => {
  const isBot = message.sender === 'bot';
  const isAlert = message.isAlert;
  
  const getAlertIcon = () => {
    switch (message.alertType) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'danger':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };
  
  const getAlertClass = () => {
    if (!isAlert) return '';
    
    switch (message.alertType) {
      case 'warning':
        return isHighContrast ? 'bg-yellow-300 border-yellow-600 text-black' : 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'danger':
        return isHighContrast ? 'bg-red-300 border-red-600 text-black' : 'bg-red-50 border-red-200 text-red-800';
      case 'success':
        return isHighContrast ? 'bg-green-300 border-green-600 text-black' : 'bg-green-50 border-green-200 text-green-800';
      default:
        return isHighContrast ? 'bg-blue-300 border-blue-600 text-black' : 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };
  
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };
  
  const getMessageClass = () => {
    if (isAlert) {
      return `flex items-start p-3 rounded-lg border ${getAlertClass()} mb-3 w-full max-w-3xl`;
    }
    
    if (message.sender === 'user') {
      return isHighContrast
        ? 'bg-blue-300 text-black rounded-lg p-3 mb-3 ml-auto max-w-xs sm:max-w-md md:max-w-lg'
        : 'bg-blue-600 text-white rounded-lg p-3 mb-3 ml-auto max-w-xs sm:max-w-md md:max-w-lg';
    } else {
      return isHighContrast
        ? 'bg-gray-300 text-black rounded-lg p-3 mb-3 mr-auto max-w-xs sm:max-w-md md:max-w-lg'
        : 'bg-gray-100 text-gray-800 rounded-lg p-3 mb-3 mr-auto max-w-xs sm:max-w-md md:max-w-lg';
    }
  };
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`rounded-lg p-3 max-w-xs ${
          isAlert
            ? getAlertClass()
            : isBot
            ? isHighContrast
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-800'
            : isHighContrast
            ? 'bg-blue-900 text-white'
            : 'bg-blue-500 text-white'
        }`}
        style={{ fontSize: `${fontSize}px` }}
      >
        <div className={getMessageClass()}>
          {isAlert && (
            <div className="mr-2 mt-1">{getAlertIcon()}</div>
          )}
          <div className="flex-1">
            <div className={`whitespace-pre-line ${getFontSizeClass()}`}>
              {message.text}
            </div>
            <div className={`text-xs mt-1 ${
              isAlert || isBot
                ? isHighContrast
                  ? 'text-gray-400'
                  : 'text-gray-500'
                : 'text-blue-100'
            }`}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;