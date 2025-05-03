import { generateUniqueId } from './helpers';
import { Message, BankAccount, Transaction } from '../types';
import { queryRAG, getRecentTransactions, getBalanceTrend, getFraudAlerts } from './api';

export const generateBotResponse = async (userInput: string): Promise<Message> => {
  try {
    // Use RAG to get a response
    const response = await queryRAG(userInput);
    return response;
  } catch (error) {
    console.error('Error generating bot response:', error);
    return {
      id: generateUniqueId(),
      text: "I'm having trouble connecting to the server. Please try again later.",
      sender: 'bot',
      timestamp: new Date(),
      isAlert: true,
      alertType: 'danger'
    };
  }
};

const generateBalanceResponse = (): string => {
  const checkingAccount = mockAccounts.find(account => account.accountType === 'Checking');
  const savingsAccount = mockAccounts.find(account => account.accountType === 'Savings');
  
  if (checkingAccount && savingsAccount) {
    return `Your current balances are:
    Checking Account: $${checkingAccount.balance.toFixed(2)}
    Savings Account: $${savingsAccount.balance.toFixed(2)}`;
  }
  
  return "I couldn't retrieve your account information at the moment. Please try again later.";
};

const generateTransactionResponse = (): string => {
  const recentTransactions = mockTransactions.slice(0, 3);
  
  if (recentTransactions.length > 0) {
    let response = "Here are your most recent transactions:\n";
    
    recentTransactions.forEach(transaction => {
      const formattedDate = transaction.date.toLocaleDateString();
      const formattedAmount = transaction.type === 'debit' ? `-$${transaction.amount.toFixed(2)}` : `+$${transaction.amount.toFixed(2)}`;
      
      response += `${formattedDate}: ${transaction.description} - ${formattedAmount}\n`;
    });
    
    return response;
  }
  
  return "You don't have any recent transactions.";
};

export const generateBankingAlert = async (type: string): Promise<Message> => {
  try {
    const alerts = await getFraudAlerts();
    if (alerts.length > 0) {
      return alerts[0];
    }
    
    // Fallback to static alerts if no real alerts are available
    let text = '';
    let alertType: 'warning' | 'info' | 'success' | 'danger' = 'info';
    
    switch (type) {
      case 'low_balance':
        text = 'Low balance alert: Your checking account balance is below $500';
        alertType = 'warning';
        break;
      case 'suspicious_activity':
        text = 'Suspicious activity detected: Unusual login attempt from an unrecognized device';
        alertType = 'danger';
        break;
      case 'payment_due':
        text = 'Payment reminder: Your credit card payment of $250 is due in 3 days';
        alertType = 'warning';
        break;
      case 'deposit_confirmation':
        text = 'Deposit confirmation: Your direct deposit of $1,200 has been processed';
        alertType = 'success';
        break;
      default:
        text = 'New notification from your bank';
    }
    
    return {
      id: generateUniqueId(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      isAlert: true,
      alertType
    };
  } catch (error) {
    console.error('Error generating banking alert:', error);
    return {
      id: generateUniqueId(),
      text: "I'm having trouble connecting to the server. Please try again later.",
      sender: 'bot',
      timestamp: new Date(),
      isAlert: true,
      alertType: 'danger'
    };
  }
};