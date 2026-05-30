import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('sidebar_settings_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      showCustomerChallan: true,
      showCustomerInvoice: false,
      showPurchaseOrder: true,
      showSalesOrder: false,
    };
  });

  React.useEffect(() => {
    localStorage.setItem('sidebar_settings_v3', JSON.stringify(settings));
  }, [settings]);

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, toggleSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
