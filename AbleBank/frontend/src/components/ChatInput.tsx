import React, { useState, useRef } from 'react';
import { MicrophoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isListening: boolean;
  toggleListening: () => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isListening, toggleListening, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
      <div className="flex items-center space-x-4">
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={toggleListening}
          className={`p-2 rounded-full ${
            isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}
          disabled={isLoading}
        >
          <MicrophoneIcon className="h-6 w-6" />
        </button>
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className={`p-2 rounded-full ${
            !inputText.trim() || isLoading
              ? 'bg-gray-200 text-gray-400'
              : 'bg-blue-500 text-white'
          }`}
        >
          <PaperAirplaneIcon className="h-6 w-6" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;