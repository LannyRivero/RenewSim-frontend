import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { DarkModeProvider } from "./context/DarkModeContext";
import { NotificationProvider } from "./context/NotificationContext";

createRoot(document.getElementById('root')).render(
  <DarkModeProvider>
    <NotificationProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </NotificationProvider>
  </DarkModeProvider>
);
