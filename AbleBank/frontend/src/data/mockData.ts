import { BankAccount, Transaction, UserProfile, Message, FraudAlert, BalanceTrend } from '../types';

export const mockAccounts: BankAccount[] = [
  {
    id: '1',
    accountNumber: '1234567890',
    accountType: 'Checking',
    balance: 2543.87,
    currency: 'USD'
  },
  {
    id: '2',
    accountNumber: '0987654321',
    accountType: 'Savings',
    balance: 15750.42,
    currency: 'USD'
  },
  {
    id: '3',
    accountNumber: '5678901234',
    accountType: 'Credit Card',
    balance: -450.19,
    currency: 'USD'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'credit',
    amount: 1000,
    category: 'salary',
    merchant: 'Employer Inc',
    timestamp: new Date()
  },
  {
    id: '2',
    type: 'debit',
    amount: 50,
    category: 'shopping',
    merchant: 'Amazon',
    timestamp: new Date(Date.now() - 3600000)
  }
];

export const mockUserProfile: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  preferredLanguage: 'English',
  accounts: mockAccounts,
  notifications: true,
  highContrastMode: false,
  fontSize: 16
};

export const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hello! I am your banking assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date()
  },
  {
    id: '2',
    text: 'Low balance alert: Your checking account balance is below $3,000',
    sender: 'bot',
    timestamp: new Date(Date.now() - 60000),
    isAlert: true,
    alertType: 'warning'
  },
  {
    id: '3',
    text: 'Payment confirmation: Your credit card payment of $250 was processed successfully',
    sender: 'bot',
    timestamp: new Date(Date.now() - 120000),
    isAlert: true,
    alertType: 'success'
  }
];

export const mockFraudAlerts: FraudAlert[] = [
  {
    id: '1',
    type: 'suspicious_activity',
    severity: 'high',
    description: 'Unusual transaction detected in a foreign country',
    timestamp: new Date()
  }
];

export const mockBalanceTrend: BalanceTrend[] = [
  {
    id: '1',
    balance: 5000,
    timestamp: new Date()
  },
  {
    id: '2',
    balance: 4950,
    timestamp: new Date(Date.now() - 3600000)
  }
];