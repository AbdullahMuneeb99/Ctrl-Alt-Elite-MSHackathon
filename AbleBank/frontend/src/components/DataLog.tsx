import React, { useState, useEffect } from 'react';
import { getRecentTransactions, getFraudAlerts, getBalanceTrend } from '../utils/api';

const DataLog: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [balanceTrend, setBalanceTrend] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [transactionsData, alertsData, balanceData] = await Promise.all([
          getRecentTransactions(),
          getFraudAlerts(),
          getBalanceTrend()
        ]);
        setTransactions(transactionsData);
        setAlerts(alertsData);
        setBalanceTrend(balanceData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Data Log</h2>
      
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Recent Transactions</h3>
        <div className="space-y-2">
          {transactions.map((transaction, index) => (
            <div key={index} className="bg-white p-2 rounded shadow">
              <p className="text-sm">
                {transaction.merchant} - ${transaction.amount}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(transaction.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Fraud Alerts</h3>
        <div className="space-y-2">
          {alerts.map((alert, index) => (
            <div key={index} className="bg-red-50 p-2 rounded shadow">
              <p className="text-sm text-red-800">{alert.description}</p>
              <p className="text-xs text-red-600">
                {new Date(alert.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-md font-medium mb-2">Balance Trend</h3>
        <div className="space-y-2">
          {balanceTrend.map((trend, index) => (
            <div key={index} className="bg-white p-2 rounded shadow">
              <p className="text-sm">
                Balance: ${trend.balance}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(trend.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataLog;
