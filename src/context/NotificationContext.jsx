import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (type, text) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 3000); 
  };

  const showSuccess = (message) => showNotification("success", message);
  const showError = (message) => showNotification("error", message);
  const showInfo = (message) => showNotification("info", message);

  return (
    <NotificationContext.Provider value={{ notification, showNotification, showSuccess, showError, showInfo }}>
      {children}
    </NotificationContext.Provider>
  );
};

