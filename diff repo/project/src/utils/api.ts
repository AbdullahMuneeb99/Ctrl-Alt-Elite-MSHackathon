import { Message, Transaction, BankAccount } from '../types';

const API_BASE_URL = 'http://localhost:5000';

export const initializeData = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/init`);
    if (!response.ok) {
      throw new Error('Failed to initialize data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error initializing data:', error);
    throw error;
  }
};

export const getRecentTransactions = async (hours: number = 24): Promise<Transaction[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/recent?hours=${hours}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recent transactions');
    }
    const data = await response.json();
    return data.transactions;
  } catch (error) {
    console.error('Error fetching recent transactions:', error);
    throw error;
  }
};

export const getFraudAlerts = async (severity?: string): Promise<Message[]> => {
  try {
    const url = severity 
      ? `${API_BASE_URL}/alerts?severity=${severity}`
      : `${API_BASE_URL}/alerts`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch fraud alerts');
    }
    const data = await response.json();
    return data.alerts.map((alert: any) => ({
      id: alert.id || Date.now().toString(),
      text: alert.description,
      sender: 'bot',
      timestamp: new Date(alert.timestamp),
      isAlert: true,
      alertType: alert.severity === 'high' ? 'danger' : 'warning'
    }));
  } catch (error) {
    console.error('Error fetching fraud alerts:', error);
    throw error;
  }
};

export const getBalanceTrend = async (): Promise<BankAccount[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/balance/trend`);
    if (!response.ok) {
      throw new Error('Failed to fetch balance trend');
    }
    const data = await response.json();
    return data.trend.map((item: any) => ({
      accountType: 'Checking',
      balance: item.amount,
      lastUpdated: new Date(item.timestamp)
    }));
  } catch (error) {
    console.error('Error fetching balance trend:', error);
    throw error;
  }
};

export const queryRAG = async (query: string, top_k: number = 3): Promise<Message> => {
  try {
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, top_k }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to query RAG system');
    }
    
    const data = await response.json();
    return {
      id: Date.now().toString(),
      text: data.response,
      sender: 'bot',
      timestamp: new Date(),
      isAlert: false
    };
  } catch (error) {
    console.error('Error querying RAG system:', error);
    throw error;
  }
}; 