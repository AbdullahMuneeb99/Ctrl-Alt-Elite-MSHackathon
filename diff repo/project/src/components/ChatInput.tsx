import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Paperclip } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isListening: boolean;
  toggleListening: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isListening, toggleListening }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      resetTranscript();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const handleVoiceInput = () => {
    toggleListening();
    if (!isListening) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t p-3 bg-white">
      <button
        type="button"
        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
        aria-label="Attach file"
      >
        <Paperclip className="w-5 h-5" />
      </button>
      
      <div className="relative flex-1">
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={1}
          aria-label="Message input"
        />
      </div>
      
      {browserSupportsSpeechRecognition && (
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`p-2 rounded-full focus:outline-none ${
            isListening ? 'bg-red-100 text-red-500' : 'text-gray-500 hover:bg-gray-100'
          }`}
          aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
      )}
      
      <button
        type="submit"
        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Send message"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};

export default ChatInput;