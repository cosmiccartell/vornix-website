import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { HelmetProvider } from 'react-helmet-async'; // Import the new manager

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider> {/* Add the manager here, wrapping your App */}
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
