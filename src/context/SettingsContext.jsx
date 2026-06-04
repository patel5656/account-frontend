import React, { createContext, useContext, useState } from 'react';

export const SUPPORTED_CURRENCIES = {
  INR: { code: 'INR', locale: 'en-IN', symbol: '₹' },
  USD: { code: 'USD', locale: 'en-US', symbol: '$' },
  EUR: { code: 'EUR', locale: 'de-DE', symbol: '€' },
  GBP: { code: 'GBP', locale: 'en-GB', symbol: '£' }
};

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('sidebar_settings_v3');
    let parsed = {};
    if (saved) {
      try {
        parsed = JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      showCustomerChallan: true,
      showCustomerInvoice: false,
      showPurchaseOrder: true,
      showSalesOrder: false,
      currency: 'INR',
      ...parsed
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

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const formatAmount = (amount) => {
    const num = Number(amount) || 0;
    const current = SUPPORTED_CURRENCIES[settings.currency] || SUPPORTED_CURRENCIES.INR;
    return new Intl.NumberFormat(current.locale, {
      style: 'currency',
      currency: current.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const currentCurrency = SUPPORTED_CURRENCIES[settings.currency] || SUPPORTED_CURRENCIES.INR;

  return (
    <SettingsContext.Provider value={{ settings, toggleSetting, updateSetting, formatAmount, currentCurrency }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

