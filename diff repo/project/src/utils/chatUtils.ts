import { generateUniqueId } from './helpers';
import { Message, BankAccount, Transaction } from '../types';
import { mockAccounts, mockTransactions } from '../data/mockData';

export const generateBotResponse = (userInput: string): Message => {
  const lowercaseInput = userInput.toLowerCase();
  let responseText = '';
  let isAlert = false;
  let alertType: 'warning' | 'info' | 'success' | 'danger' | undefined = undefined;

  // Simple NLP to determine intent
  if (lowercaseInput.includes('balance') || lowercaseInput.includes('how much') || lowercaseInput.includes('money')) {
    responseText = generateBalanceResponse();
  } else if (lowercaseInput.includes('transaction') || lowercaseInput.includes('recent') || lowercaseInput.includes('history')) {
    responseText = generateTransactionResponse();
  } else if (lowercaseInput.includes('suspicious') || lowercaseInput.includes('fraud')) {
    responseText = "I've flagged your account for potential suspicious activity. Our security team will review it and contact you within 24 hours.";
    isAlert = true;
    alertType = 'danger';
  } else if (lowercaseInput.includes('payment due') || lowercaseInput.includes('bill')) {
    responseText = "Your next credit card payment of $250 is due on October 25, 2023. Would you like to schedule a payment?";
    isAlert = true;
    alertType = 'warning';
  } else if (lowercaseInput.includes('deposit') || lowercaseInput.includes('received')) {
    responseText = "Your deposit of $1,500 has been successfully processed and is now available in your checking account.";
    isAlert = true;
    alertType = 'success';
  } else if (lowercaseInput.includes('help') || lowercaseInput.includes('can you')) {
    responseText = "I can help you with checking your balance, reviewing recent transactions, reporting suspicious activity, making payments, and more. What would you like to do?";
  } else if (lowercaseInput.includes('thank')) {
    responseText = "You're welcome! Is there anything else I can help you with today?";
  } else {
    responseText = "I'm not sure I understand. Could you please rephrase your question? You can ask about your balance, recent transactions, or schedule payments.";
  }

  return {
    id: generateUniqueId(),
    text: responseText,
    sender: 'bot',
    timestamp: new Date(),
    isAlert,
    alertType
  };
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

export const generateBankingAlert = (type: string): Message => {
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
};