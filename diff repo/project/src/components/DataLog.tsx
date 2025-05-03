import React, { useState, useEffect } from 'react';

const DataLog: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const fetchDummyData = () => {
      const newLog = `Dummy log entry at ${new Date().toLocaleTimeString()}`;
      setLogs(prevLogs => [newLog, ...prevLogs]); // Add new log to the top of the stack
    };

    const interval = setInterval(fetchDummyData, Math.random() * (7000 - 5000) + 5000); // Random interval between 5-7 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Data Log</h2>
      <ul className="space-y-2">
        {logs.map((log, index) => (
          <li key={index} className="text-sm text-gray-700">
            {log}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataLog;
