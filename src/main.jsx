// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css'; // keep your styling import if present

// Global safety handlers to avoid silent white screens and provide better logs
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // keep it from crashing silently - you can surface a toast/notification here
  });

  window.addEventListener('error', (e) => {
    // e.error may be undefined for resource/CSP errors
    console.error('Global error caught:', e.error || e.message || e);
  });
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
