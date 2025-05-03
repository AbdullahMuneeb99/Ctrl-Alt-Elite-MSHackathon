import React, { useState, useEffect, useRef } from 'react';
import 'regenerator-runtime/runtime';
import './index.css';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import AccessibilityPanel from './components/AccessibilityPanel';
import { Message, UserProfile } from './types';
import { generateUniqueId } from './utils/helpers';
import { generateBotResponse, generateBankingAlert } from './utils/chatUtils';
import { mockUserProfile, initialMessages } from './data/mockData';
import DataLog from './components/DataLog'; // Import the DataLog component

function App() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
  const [isListening, setIsListening] = useState(false);
  const [accessibilityPanelOpen, setAccessibilityPanelOpen] = useState(false);
  const [unreadAlerts, setUnreadAlerts] = useState(2);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Simulate receiving banking alerts
  useEffect(() => {
    const alertTypes = ['low_balance', 'suspicious_activity', 'payment_due', 'deposit_confirmation'];
    
    const alertInterval = setInterval(() => {
      const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const newAlert = generateBankingAlert(randomType);
      
      setMessages(prevMessages => [...prevMessages, newAlert]);
      setUnreadAlerts(prev => prev + 1);
    }, 120000); // Every 2 minutes
    
    return () => clearInterval(alertInterval);
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (text: string) => {
    const newUserMessage: Message = {
      id: generateUniqueId(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    
    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };
  
  const handleUpdateProfile = (updatedProfile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updatedProfile }));
  };
  
  const toggleListening = () => {
    setIsListening(!isListening);
  };
  
  const toggleAccessibilityPanel = () => {
    setAccessibilityPanelOpen(!accessibilityPanelOpen);
  };
  
  return (
    <div className={`flex h-screen ${userProfile.highContrastMode ? 'bg-black text-white' : 'bg-gray-50'}`}>
      {/* Sidebar for DataLog */}
      <aside className="w-1/4 bg-white shadow-md p-4 overflow-y-auto">
        <DataLog />
      </aside>

      {/* Main Chat UI */}
      <div className="flex flex-col flex-1">
        <ChatHeader 
          onToggleAccessibilityPanel={toggleAccessibilityPanel}
          unreadAlerts={unreadAlerts}
        />
        
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto"> {/* Shortened chat UI width */}
            {messages.map(message => (
              <ChatMessage
                key={message.id}
                message={message}
                isHighContrast={userProfile.highContrastMode}
                fontSize={userProfile.fontSize}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </main>
        
        <ChatInput
          onSendMessage={handleSendMessage}
          isListening={isListening}
          toggleListening={toggleListening}
        />
        
        <AccessibilityPanel
          userProfile={userProfile}
          onUpdateProfile={handleUpdateProfile}
          isOpen={accessibilityPanelOpen}
          onClose={() => setAccessibilityPanelOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;