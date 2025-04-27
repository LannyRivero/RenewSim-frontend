import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AppProviders } from './context/Providers';

createRoot(document.getElementById('root')).render(
  <AppProviders>
    <StrictMode>
      <App />
    </StrictMode>
  </AppProviders>
);
