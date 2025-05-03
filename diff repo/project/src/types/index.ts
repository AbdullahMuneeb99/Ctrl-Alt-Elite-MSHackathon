export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isAlert?: boolean;
  alertType?: 'warning' | 'info' | 'success' | 'danger';
}

export interface BankAccount {
  id: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
}

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
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
  fontSize: 'small' | 'medium' | 'large';
}