# Cookies, Currency & Language Guide

## Overview

The Development Studio website now includes comprehensive cookie consent management, region-based currency conversion, and multi-language support. This guide explains how these features work and how to use them.

---

## 🍪 Cookie Consent System

### Features

- **GDPR Compliant**: Full cookie consent banner with granular controls
- **Cookie Categories**:
  - **Necessary Cookies**: Always active (essential for website function)
  - **Functional Cookies**: Language/currency preferences, user settings
  - **Analytics Cookies**: Traffic analysis and user behavior tracking
  - **Marketing Cookies**: Advertising and retargeting

### User Experience

1. **First Visit**: Cookie banner appears at the bottom of the screen after 1 second
2. **User Options**:
   - **Accept All**: Enables all cookie categories
   - **Reject All**: Only necessary cookies (disables functional, analytics, marketing)
   - **Manage Cookies**: Opens detailed settings dialog to toggle individual categories

3. **Cookie Settings Dialog**:
   - Toggle each cookie category on/off (except necessary)
   - See description of what each category does
   - Save preferences

### Implementation

```tsx
import { CookieConsent } from './components/CookieConsent';

// In your app
<CookieConsent onNavigate={navigateFunction} />
```

### Storage

- Preferences stored in `localStorage` as `cookieConsent`
- Consent timestamp stored as `cookieConsentDate`
- Persists across sessions

### Cookies Policy Page

- Accessible via footer link or cookie banner
- Comprehensive explanation of:
  - What cookies are
  - Types of cookies used
  - How to manage preferences
  - Third-party cookies
  - Contact information

---

## 💱 Region-Based Currency System

### Supported Currencies

| Currency | Symbol | Region | Conversion Rate (from INR) |
|----------|--------|--------|----------------------------|
| INR | ₹ | India | 1.0 (base) |
| USD | $ | United States | 0.012 |
| EUR | € | Europe | 0.011 |
| GBP | £ | United Kingdom | 0.0095 |
| AUD | A$ | Australia | 0.018 |
| CAD | C$ | Canada | 0.016 |
| SGD | S$ | Singapore | 0.016 |
| AED | AED | UAE | 0.044 |
| JPY | ¥ | Japan | 1.8 |

### Auto-Detection

The system automatically detects the user's region based on:
1. **Browser Timezone**: Primary detection method
2. **Browser Language**: Secondary indicator
3. **Saved Preferences**: Persists user's manual selection

### Manual Selection

Users can change currency via the currency selector in the header:
- Click the currency dropdown ($ icon)
- Select preferred currency from the list
- Shows full currency name and symbol
- Preference is saved to `localStorage`

### Using Currency in Your Code

```tsx
import { useLocale } from '../contexts/LocaleContext';

function MyComponent() {
  const { formatPrice, currency, currencySymbol } = useLocale();
  
  // Format a price (amount should be in INR)
  const displayPrice = formatPrice(50000); // "₹50,000" or "$600" etc.
  
  // Get current currency
  console.log(currency); // "USD"
  
  // Get currency symbol
  console.log(currencySymbol); // "$"
  
  return <div>{displayPrice}</div>;
}
```

### PriceDisplay Component

Use the pre-built component for consistent price formatting:

```tsx
import { PriceDisplay } from './components/PriceDisplay';

// Basic usage
<PriceDisplay priceInINR={50000} />

// Show original INR price
<PriceDisplay priceInINR={100000} showOriginal={true} />
// Output: "$1,200 (₹100,000.00)"
```

### Updating Conversion Rates

Edit `/utils/regionDetection.ts`:

```typescript
export const currencyRates: Record<string, number> = {
  INR: 1,
  USD: 0.012, // Update this value
  EUR: 0.011,
  // ... other currencies
};
```

---

## 🌍 Multi-Language Support

### Supported Languages

| Code | Language | Native Name |
|------|----------|-------------|
| en | English | English |
| hi | Hindi | हिन्दी |
| es | Spanish | Español |
| fr | French | Français |
| de | German | Deutsch |
| ja | Japanese | 日本語 |
| ar | Arabic | العربية |

### Auto-Detection

The system detects language from:
1. **Saved Preference**: User's previous selection
2. **Browser Language**: Primary browser language setting
3. **Region**: Falls back to English if unsupported

### Manual Selection

Users can change language via the language selector in the header:
- Click the language dropdown (🌍 icon)
- Select preferred language
- Shows both native name and English name
- Preference is saved to `localStorage`

### Using Translations

```tsx
import { useLocale } from '../contexts/LocaleContext';

function MyComponent() {
  const { t, language } = useLocale();
  
  return (
    <div>
      <h1>{t('heroTitle')}</h1>
      <p>{t('heroDescription')}</p>
      <button>{t('getStarted')}</button>
    </div>
  );
}
```

### Available Translation Keys

Common keys (see `/utils/i18n.ts` for full list):

```typescript
// Navigation
t('home')
t('about')
t('services')
t('works')
t('contact')

// Common Actions
t('learnMore')
t('getStarted')
t('readMore')
t('submit')

// Hero Section
t('heroTitle')
t('heroSubtitle')
t('heroDescription')

// Cookie Consent
t('cookieConsentTitle')
t('cookieConsentMessage')
t('acceptAll')
t('rejectAll')

// Footer
t('privacyPolicy')
t('termsConditions')
t('cookiesPolicy')
```

### Adding New Translations

Edit `/utils/i18n.ts`:

```typescript
export const translations: Record<SupportedLanguage, Translation> = {
  en: {
    newKey: 'New Translation',
    nested: {
      key: 'Nested Translation'
    }
  },
  hi: {
    newKey: 'नया अनुवाद',
    nested: {
      key: 'नेस्टेड अनुवाद'
    }
  },
  // ... add to all languages
};
```

### Adding New Languages

1. Add language code to `SupportedLanguage` type:
```typescript
export type SupportedLanguage = 'en' | 'hi' | 'es' | 'fr' | 'de' | 'ja' | 'ar' | 'newLang';
```

2. Add translations to the dictionary:
```typescript
export const translations: Record<SupportedLanguage, Translation> = {
  // ... existing languages
  newLang: {
    home: 'Translation',
    // ... all keys
  }
};
```

3. Add to available languages list:
```typescript
export function getAvailableLanguages() {
  return [
    // ... existing
    { code: 'newLang', name: 'New Language', nativeName: 'Native Name' },
  ];
}
```

---

## 🔧 LocaleContext API

### Provider Setup

Wrap your app with `LocaleProvider`:

```tsx
import { LocaleProvider } from './contexts/LocaleContext';

<LocaleProvider>
  <App />
</LocaleProvider>
```

### Available Properties

```typescript
interface LocaleContextType {
  // Currency
  currency: string;                    // Current currency code (e.g., "USD")
  currencySymbol: string;              // Current currency symbol (e.g., "$")
  setCurrency: (currency: string) => void;
  formatPrice: (amountInINR: number) => string;
  availableCurrencies: Array<{
    code: string;
    currency: string;
    symbol: string;
    name: string;
  }>;
  
  // Language
  language: SupportedLanguage;         // Current language code
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string) => string;          // Translation function
  availableLanguages: Array<{
    code: string;
    name: string;
    nativeName: string;
  }>;
  
  // Region
  region: RegionInfo;                  // Full region information
}
```

---

## 📱 Responsive Design

All locale features are fully responsive:

- **Mobile**: Compact selectors with icons only
- **Desktop**: Full text labels with icons
- **Cookie Banner**: Stacks buttons on mobile, row on desktop
- **Cookie Settings**: Scrollable on mobile

---

## 🎨 Customization

### Styling

All components use Tailwind CSS and respect the global theme:

```tsx
// Change cookie banner position
<CookieConsent /> // Default: bottom
// Edit component to change position

// Customize selector appearance
// Edit /components/LocaleSelector.tsx
```

### Behavior

```tsx
// Change auto-advance delay for cookie banner
// In /components/CookieConsent.tsx, line ~30:
const timer = setTimeout(() => {
  setShowBanner(true);
}, 1000); // Change this value (milliseconds)
```

---

## 💾 Data Persistence

All preferences are stored in `localStorage`:

| Key | Value | Description |
|-----|-------|-------------|
| `cookieConsent` | JSON object | Cookie preferences |
| `cookieConsentDate` | ISO string | Consent timestamp |
| `userCurrency` | String | Selected currency |
| `userLanguage` | String | Selected language |
| `userRegion` | JSON object | Region information |

---

## 🔒 Privacy & Compliance

### GDPR Compliance

- ✅ Explicit consent required before non-essential cookies
- ✅ Granular control over cookie categories
- ✅ Easy opt-out mechanism
- ✅ Clear privacy policy and cookie policy
- ✅ Consent timestamp tracking

### Data Storage

- All preferences stored locally (no server transmission)
- No tracking before consent
- User can clear preferences anytime via browser

---

## 🐛 Troubleshooting

### Currency Not Converting

**Issue**: Prices still showing in INR
**Solution**: Ensure you're using `formatPrice()` from `useLocale` hook

```tsx
// ❌ Wrong
<div>₹{price}</div>

// ✅ Correct
const { formatPrice } = useLocale();
<div>{formatPrice(price)}</div>
```

### Translations Not Working

**Issue**: Seeing translation keys instead of text
**Solution**: 
1. Check key exists in `/utils/i18n.ts`
2. Ensure you're using `t()` function from `useLocale`
3. Verify translation exists for current language

### Cookie Banner Not Appearing

**Issue**: Cookie consent banner doesn't show
**Solution**:
1. Check localStorage - clear `cookieConsent` to reset
2. Verify `CookieConsent` component is rendered
3. Check browser console for errors

---

## 📊 Analytics Integration

### With Cookie Consent

Only track users who have consented to analytics:

```tsx
const consent = JSON.parse(localStorage.getItem('cookieConsent') || '{}');

if (consent.analytics) {
  // Initialize analytics
  // Google Analytics, Mixpanel, etc.
}
```

### With Language Preference

Track user language for better insights:

```tsx
const { language, currency } = useLocale();

analytics.setUserProperties({
  language,
  currency,
  region: region.country
});
```

---

## 🚀 Best Practices

1. **Always use INR as base**: Store all prices in INR, convert on display
2. **Test all languages**: Ensure UI doesn't break with longer text
3. **Respect user choice**: Don't auto-reset preferences
4. **Update rates regularly**: Keep currency conversion rates current
5. **Provide fallbacks**: Always have English translations
6. **Mobile first**: Test selectors on mobile devices
7. **Accessibility**: Ensure keyboard navigation works

---

## 📞 Support

For issues or questions about cookie/locale features:

- **Email**: supports@devstudioco.com
- **Phone**: +91 8438028227
- **Documentation**: See this file and code comments

---

## ✅ Feature Checklist

- [x] Cookie consent banner
- [x] Cookie preferences dialog
- [x] Cookies policy page
- [x] Region auto-detection
- [x] 9 currency support
- [x] Manual currency selection
- [x] Language auto-detection
- [x] 7 language support
- [x] Manual language selection
- [x] LocalStorage persistence
- [x] Responsive design
- [x] GDPR compliance
- [x] Translation system
- [x] Price formatting utility
- [x] PriceDisplay component

---

## 📝 Example: Complete Implementation

```tsx
import { useLocale } from '../contexts/LocaleContext';
import { PriceDisplay } from './PriceDisplay';

export function ProductCard() {
  const { t, formatPrice, currency } = useLocale();
  
  return (
    <div className="product-card">
      <h3>{t('productTitle')}</h3>
      <p>{t('productDescription')}</p>
      
      {/* Option 1: Use hook directly */}
      <p className="price">{formatPrice(50000)}</p>
      
      {/* Option 2: Use component */}
      <PriceDisplay priceInINR={50000} showOriginal />
      
      <button>{t('addToCart')}</button>
      
      <small>
        {t('shippingNote')} {currency}
      </small>
    </div>
  );
}
```

---

## 🔄 Version History

- **v1.0.0** (Oct 2025): Initial release
  - Cookie consent system
  - 9 currencies
  - 7 languages
  - Auto-detection
  - Full GDPR compliance

---

*Last Updated: October 15, 2025*
