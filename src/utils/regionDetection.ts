// Region and locale detection utilities

export interface RegionInfo {
  country: string;
  currency: string;
  currencySymbol: string;
  language: string;
  locale: string;
}

// Currency conversion rates (base: INR)
export const currencyRates: Record<string, number> = {
  INR: 1,
  USD: 0.012, // 1 INR = 0.012 USD
  EUR: 0.011, // 1 INR = 0.011 EUR
  GBP: 0.0095, // 1 INR = 0.0095 GBP
  AUD: 0.018, // 1 INR = 0.018 AUD
  CAD: 0.016, // 1 INR = 0.016 CAD
  SGD: 0.016, // 1 INR = 0.016 SGD
  AED: 0.044, // 1 INR = 0.044 AED
  JPY: 1.8, // 1 INR = 1.8 JPY
};

// Region to currency mapping
const regionCurrencyMap: Record<string, { currency: string; symbol: string; language: string }> = {
  IN: { currency: 'INR', symbol: '₹', language: 'en-IN' },
  US: { currency: 'USD', symbol: '$', language: 'en-US' },
  GB: { currency: 'GBP', symbol: '£', language: 'en-GB' },
  EU: { currency: 'EUR', symbol: '€', language: 'en-EU' },
  AU: { currency: 'AUD', symbol: 'A$', language: 'en-AU' },
  CA: { currency: 'CAD', symbol: 'C$', language: 'en-CA' },
  SG: { currency: 'SGD', symbol: 'S$', language: 'en-SG' },
  AE: { currency: 'AED', symbol: 'AED', language: 'en-AE' },
  JP: { currency: 'JPY', symbol: '¥', language: 'ja-JP' },
};

// European countries using EUR
const euroCountries = [
  'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT', 'IE', 'FI', 'GR', 'LU', 'MT', 'CY', 'EE', 'LV', 'LT', 'SK', 'SI'
];

// Detect region from timezone
export function detectRegionFromTimezone(): string {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Map timezone to country code
    if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta')) return 'IN';
    if (timezone.includes('America/New_York') || timezone.includes('America/Los_Angeles') || timezone.includes('America/Chicago')) return 'US';
    if (timezone.includes('Europe/London')) return 'GB';
    if (timezone.includes('Australia/')) return 'AU';
    if (timezone.includes('America/Toronto')) return 'CA';
    if (timezone.includes('Asia/Singapore')) return 'SG';
    if (timezone.includes('Asia/Dubai')) return 'AE';
    if (timezone.includes('Asia/Tokyo')) return 'JP';
    
    // Check for European countries
    for (const country of euroCountries) {
      if (timezone.includes(`Europe/`)) return 'EU';
    }
    
    return 'IN'; // Default to India
  } catch (error) {
    console.error('Error detecting timezone:', error);
    return 'IN';
  }
}

// Detect language from browser
export function detectBrowserLanguage(): string {
  try {
    const language = navigator.language || navigator.languages?.[0] || 'en-IN';
    return language;
  } catch (error) {
    console.error('Error detecting language:', error);
    return 'en-IN';
  }
}

// Get region info
export function getRegionInfo(countryCode?: string): RegionInfo {
  const detectedCountry = countryCode || detectRegionFromTimezone();
  const detectedLanguage = detectBrowserLanguage();
  
  const regionData = regionCurrencyMap[detectedCountry] || regionCurrencyMap['IN'];
  
  return {
    country: detectedCountry,
    currency: regionData.currency,
    currencySymbol: regionData.symbol,
    language: detectedLanguage,
    locale: regionData.language,
  };
}

// Format currency
export function formatCurrency(amountInINR: number, targetCurrency: string = 'INR'): string {
  const rate = currencyRates[targetCurrency] || 1;
  const convertedAmount = amountInINR * rate;
  
  const currencySymbol = Object.values(regionCurrencyMap).find(
    (region) => region.currency === targetCurrency
  )?.symbol || '₹';
  
  // Format with appropriate decimal places
  const decimals = targetCurrency === 'JPY' ? 0 : 2;
  
  return `${currencySymbol}${convertedAmount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

// Get all available currencies
export function getAvailableCurrencies() {
  return Object.entries(regionCurrencyMap).map(([code, data]) => ({
    code,
    currency: data.currency,
    symbol: data.symbol,
    name: getCurrencyName(data.currency),
  }));
}

// Get currency name
function getCurrencyName(currency: string): string {
  const names: Record<string, string> = {
    INR: 'Indian Rupee',
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    AUD: 'Australian Dollar',
    CAD: 'Canadian Dollar',
    SGD: 'Singapore Dollar',
    AED: 'UAE Dirham',
    JPY: 'Japanese Yen',
  };
  return names[currency] || currency;
}
