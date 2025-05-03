import { Message, Transaction } from '../types';

export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const processUserInput = (input: string): string => {
  // Simple NLP processing (would be replaced with a more sophisticated solution)
  const lowercaseInput = input.toLowerCase();
  
  if (lowercaseInput.includes('balance')) {
    return 'QUERY_BALANCE';
  } else if (lowercaseInput.includes('transaction') || lowercaseInput.includes('recent')) {
    return 'QUERY_TRANSACTIONS';
  } else if (lowercaseInput.includes('pay') || lowercaseInput.includes('bill')) {
    return 'PAYMENT';
  } else if (lowercaseInput.includes('transfer')) {
    return 'TRANSFER';
  } else if (lowercaseInput.includes('help')) {
    return 'HELP';
  } else {
    return 'UNKNOWN';
  }
};

export const filterTransactionsByDate = (
  transactions: Transaction[],
  startDate?: Date,
  endDate?: Date
): Transaction[] => {
  return transactions.filter((transaction) => {
    if (startDate && transaction.date < startDate) return false;
    if (endDate && transaction.date > endDate) return false;
    return true;
  });
};

export const filterTransactionsByType = (
  transactions: Transaction[],
  type: 'credit' | 'debit' | 'all'
): Transaction[] => {
  if (type === 'all') return transactions;
  return transactions.filter((transaction) => transaction.type === type);
};

export const sortMessagesByTimestamp = (messages: Message[]): Message[] => {
  return [...messages].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  // This would be replaced with an actual translation API call
  // For now, we'll just return the original text
  console.log(`Translating to ${targetLanguage}: ${text}`);
  return text;
};

export const getAlertColor = (type: 'danger' | 'warning' | 'success' | 'info'): string => {
  switch (type) {
    case 'danger':
      return 'bg-red-100 text-red-800';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800';
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'info':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getAlertIcon = (type: 'danger' | 'warning' | 'success' | 'info'): string => {
  switch (type) {
    case 'danger':
      return '⚠️';
    case 'warning':
      return '⚠️';
    case 'success':
      return '✅';
    case 'info':
      return 'ℹ️';
    default:
      return 'ℹ️';
  }
};

export const getTransactionColor = (type: 'credit' | 'debit'): string => {
  return type === 'credit' ? 'text-green-600' : 'text-red-600';
};

export const getTransactionIcon = (type: 'credit' | 'debit'): string => {
  return type === 'credit' ? '↑' : '↓';
};