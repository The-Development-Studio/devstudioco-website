import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getRegionInfo, formatCurrency, RegionInfo, getAvailableCurrencies } from '../utils/regionDetection';
import { SupportedLanguage, getTranslation, getLanguageFromLocale, getAvailableLanguages } from '../utils/i18n';

interface LocaleContextType {
  // Currency
  currency: string;
  currencySymbol: string;
  setCurrency: (currency: string) => void;
  formatPrice: (amountInINR: number) => string;
  availableCurrencies: ReturnType<typeof getAvailableCurrencies>;
  
  // Language
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string) => string;
  availableLanguages: ReturnType<typeof getAvailableLanguages>;
  
  // Region
  region: RegionInfo;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<RegionInfo>(() => {
    // Try to load from localStorage first
    const saved = localStorage.getItem('userRegion');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return getRegionInfo();
      }
    }
    return getRegionInfo();
  });

  const [currency, setCurrencyState] = useState<string>(() => {
    const saved = localStorage.getItem('userCurrency');
    return saved || region.currency;
  });

  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('userLanguage');
    if (saved) {
      return saved as SupportedLanguage;
    }
    return getLanguageFromLocale(region.language);
  });

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('userCurrency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('userLanguage', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('userRegion', JSON.stringify(region));
  }, [region]);

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
    
    // Update currency symbol
    const currencyData = getAvailableCurrencies().find(c => c.currency === newCurrency);
    if (currencyData) {
      setRegion(prev => ({
        ...prev,
        currency: newCurrency,
        currencySymbol: currencyData.symbol,
      }));
    }
  };

  const setLanguage = (newLanguage: SupportedLanguage) => {
    setLanguageState(newLanguage);
  };

  const formatPrice = (amountInINR: number): string => {
    return formatCurrency(amountInINR, currency);
  };

  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  const value: LocaleContextType = {
    currency,
    currencySymbol: region.currencySymbol,
    setCurrency,
    formatPrice,
    availableCurrencies: getAvailableCurrencies(),
    language,
    setLanguage,
    t,
    availableLanguages: getAvailableLanguages(),
    region,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
