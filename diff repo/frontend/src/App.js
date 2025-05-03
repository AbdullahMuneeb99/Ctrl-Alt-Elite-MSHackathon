import React from 'react';
import Dashboard from './components/Dashboard';
import Alerts from './components/Alerts';
import AccessibilitySettings from './components/AccessibilitySettings';
import './styles/main.css';

function App() {
  return (
    <div>
      <h1>AbleBank Copilot</h1>
      <AccessibilitySettings />
      <Dashboard />
      <Alerts />
    </div>
  );
}

export default App;
