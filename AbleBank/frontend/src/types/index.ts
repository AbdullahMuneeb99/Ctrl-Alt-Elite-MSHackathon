export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isAlert?: boolean;
  alertType?: 'danger' | 'warning' | 'success' | 'info';
}

export interface BankAccount {
  id: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
  lastUpdated: Date;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  category: string;
  merchant: string;
  timestamp: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredLanguage: string;
  accounts: BankAccount[];
  notifications: boolean;
  highContrastMode: boolean;
  fontSize: number;
}

export interface FraudAlert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  timestamp: Date;
}

export interface BalanceTrend {
  id: string;
  balance: number;
  timestamp: Date;
}