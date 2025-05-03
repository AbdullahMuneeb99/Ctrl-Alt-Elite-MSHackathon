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
import DataLog from './components/DataLog';
import { initializeData } from './utils/api';

function App() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
  const [isListening, setIsListening] = useState(false);
  const [accessibilityPanelOpen, setAccessibilityPanelOpen] = useState(false);
  const [unreadAlerts, setUnreadAlerts] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Initialize data when component mounts
  useEffect(() => {
    const init = async () => {
      try {
        await initializeData();
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };
    init();
  }, []);
  
  // Simulate receiving banking alerts
  useEffect(() => {
    const alertTypes = ['low_balance', 'suspicious_activity', 'payment_due', 'deposit_confirmation'];
    
    const alertInterval = setInterval(async () => {
      const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const newAlert = await generateBankingAlert(randomType);
      
      setMessages(prevMessages => [...prevMessages, newAlert]);
      setUnreadAlerts(prev => prev + 1);
    }, 120000); // Every 2 minutes
    
    return () => clearInterval(alertInterval);
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async (text: string) => {
    const newUserMessage: Message = {
      id: generateUniqueId(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsLoading(true);
    
    try {
      const botResponse = await generateBotResponse(text);
      setMessages(prevMessages => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error generating bot response:', error);
      setMessages(prevMessages => [...prevMessages, {
        id: generateUniqueId(),
        text: "I'm having trouble connecting to the server. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
        isAlert: true,
        alertType: 'danger'
      }]);
    } finally {
      setIsLoading(false);
    }
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
          <div className="max-w-3xl mx-auto">
            {messages.map(message => (
              <ChatMessage
                key={message.id}
                message={message}
                isHighContrast={userProfile.highContrastMode}
                fontSize={userProfile.fontSize}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>
        
        <ChatInput
          onSendMessage={handleSendMessage}
          isListening={isListening}
          toggleListening={toggleListening}
          isLoading={isLoading}
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