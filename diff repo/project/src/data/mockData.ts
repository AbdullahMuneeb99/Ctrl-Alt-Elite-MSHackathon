import { BankAccount, Transaction, UserProfile, Message } from '../types';

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
    date: new Date('2023-10-15'),
    description: 'Grocery Store',
    amount: 78.35,
    type: 'debit',
    category: 'Food'
  },
  {
    id: '2',
    date: new Date('2023-10-14'),
    description: 'Salary Deposit',
    amount: 3200.00,
    type: 'credit',
    category: 'Income'
  },
  {
    id: '3',
    date: new Date('2023-10-13'),
    description: 'Electric Bill',
    amount: 145.72,
    type: 'debit',
    category: 'Utilities'
  },
  {
    id: '4',
    date: new Date('2023-10-10'),
    description: 'Restaurant',
    amount: 56.20,
    type: 'debit',
    category: 'Dining'
  },
  {
    id: '5',
    date: new Date('2023-10-08'),
    description: 'Gas Station',
    amount: 45.00,
    type: 'debit',
    category: 'Transportation'
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
  fontSize: 'medium'
};

export const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Welcome to BankAssist! How can I help you today?',
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