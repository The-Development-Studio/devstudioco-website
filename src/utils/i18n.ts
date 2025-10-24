// Internationalization utilities and translations

export type SupportedLanguage = 'en' | 'hi' | 'es' | 'fr' | 'de' | 'ja' | 'ar';

export interface Translation {
  [key: string]: string | Translation;
}

// Translation dictionary
export const translations: Record<SupportedLanguage, Translation> = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    works: 'Works',
    blog: 'Blog',
    support: 'Support',
    contact: 'Contact',
    clientPortal: 'Client Portal',
    
    // Common
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    readMore: 'Read More',
    viewAll: 'View All',
    submit: 'Submit',
    send: 'Send',
    close: 'Close',
    accept: 'Accept',
    decline: 'Decline',
    settings: 'Settings',
    language: 'Language',
    currency: 'Currency',
    
    // Hero
    heroTitle: 'Crafting Dreams into Designs',
    heroSubtitle: 'Your Vision, Our Artistry',
    heroDescription: 'ISO-certified company specializing in web, mobile, and enterprise software solutions',
    
    // Services
    servicesTitle: 'Our Services',
    servicesDescription: 'Comprehensive software solutions tailored to your needs',
    
    // Contact
    contactTitle: 'Get in Touch',
    contactDescription: 'We\'d love to hear from you',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    subject: 'Subject',
    
    // Footer
    footerTagline: 'Crafting Dreams into Designs: Your Vision, Our Artistry',
    quickLinks: 'Quick Links',
    legal: 'Legal',
    privacyPolicy: 'Privacy Policy',
    termsConditions: 'Terms & Conditions',
    refundPolicy: 'Refund Policy',
    cookiesPolicy: 'Cookies Policy',
    allRightsReserved: 'All rights reserved',
    
    // Cookie Consent
    cookieConsentTitle: 'We use cookies',
    cookieConsentMessage: 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
    acceptAll: 'Accept All',
    rejectAll: 'Reject All',
    manageCookies: 'Manage Cookies',
    
    // Testimonials
    testimonialsTitle: 'What Our Clients Say',
    testimonialsDescription: 'Don\'t just take our word for it',
    
    // Team
    teamTitle: 'Meet Our Team',
    teamDescription: 'The talented people behind our success',
  },
  
  hi: {
    // Navigation
    home: 'होम',
    about: 'हमारे बारे में',
    services: 'सेवाएं',
    works: 'काम',
    blog: 'ब्लॉग',
    support: 'समर्थन',
    contact: 'संपर्क करें',
    clientPortal: 'क्लाइंट पोर्टल',
    
    // Common
    learnMore: 'और जानें',
    getStarted: 'शुरू करें',
    readMore: 'और पढ़ें',
    viewAll: 'सभी देखें',
    submit: 'सबमिट करें',
    send: 'भेजें',
    close: 'बंद करें',
    accept: 'स्वीकार करें',
    decline: 'अस्वीकार करें',
    settings: 'सेटिंग्स',
    language: 'भाषा',
    currency: 'मुद्रा',
    
    // Hero
    heroTitle: 'सपनों को डिज़ाइन में बदलना',
    heroSubtitle: 'आपकी दृष्टि, हमारी कला',
    heroDescription: 'आईएसओ-प्रमाणित कंपनी वेब, मोबाइल और एंटरप्राइज सॉफ्टवेयर समाधानों में विशेषज्ञता',
    
    // Services
    servicesTitle: 'हमारी सेवाएं',
    servicesDescription: 'आपकी आवश्यकताओं के अनुरूप व्यापक सॉफ्टवेयर समाधान',
    
    // Contact
    contactTitle: 'संपर्क में रहें',
    contactDescription: 'हम आपसे सुनना पसंद करेंगे',
    name: 'नाम',
    email: 'ईमेल',
    phone: 'फोन',
    message: 'संदेश',
    subject: 'विषय',
    
    // Footer
    footerTagline: 'सपनों को डिज़ाइन में बदलना: आपकी दृष्टि, हमारी कला',
    quickLinks: 'त्वरित लिंक',
    legal: 'कानूनी',
    privacyPolicy: 'गोपनीयता नीति',
    termsConditions: 'नियम और शर्तें',
    refundPolicy: 'रिफंड नीति',
    cookiesPolicy: 'कुकीज़ नीति',
    allRightsReserved: 'सर्वाधिकार सुरक्षित',
    
    // Cookie Consent
    cookieConsentTitle: 'हम कुकीज़ का उपयोग करते हैं',
    cookieConsentMessage: 'हम आपके ब्राउज़िंग अनुभव को बेहतर बनाने, वैयक्तिकृत सामग्री प्रदान करने और हमारे ट्रैफ़िक का विश्लेषण करने के लिए कुकीज़ का उपयोग करते हैं। "सभी स्वीकार करें" पर क्लिक करके, आप कुकीज़ के हमारे उपयोग के लिए सहमति देते हैं।',
    acceptAll: 'सभी स्वीकार करें',
    rejectAll: 'सभी अस्वीकार करें',
    manageCookies: 'कुकीज़ प्रबंधित करें',
    
    // Testimonials
    testimonialsTitle: 'हमारे ग्राहक क्या कहते हैं',
    testimonialsDescription: 'बस हमारी बात न लें',
    
    // Team
    teamTitle: 'हमारी टीम से मिलें',
    teamDescription: 'हमारी सफलता के पीछे प्रतिभाशाली लोग',
  },
  
  es: {
    home: 'Inicio',
    about: 'Acerca de',
    services: 'Servicios',
    works: 'Trabajos',
    blog: 'Blog',
    support: 'Soporte',
    contact: 'Contacto',
    clientPortal: 'Portal del Cliente',
    learnMore: 'Aprende más',
    getStarted: 'Empezar',
    heroTitle: 'Convirtiendo Sueños en Diseños',
    heroSubtitle: 'Tu Visión, Nuestro Arte',
    cookieConsentTitle: 'Usamos cookies',
    acceptAll: 'Aceptar todo',
    rejectAll: 'Rechazar todo',
  },
  
  fr: {
    home: 'Accueil',
    about: 'À propos',
    services: 'Services',
    works: 'Travaux',
    blog: 'Blog',
    support: 'Support',
    contact: 'Contact',
    clientPortal: 'Portail Client',
    learnMore: 'En savoir plus',
    getStarted: 'Commencer',
    heroTitle: 'Transformer les Rêves en Designs',
    heroSubtitle: 'Votre Vision, Notre Art',
    cookieConsentTitle: 'Nous utilisons des cookies',
    acceptAll: 'Tout accepter',
    rejectAll: 'Tout rejeter',
  },
  
  de: {
    home: 'Start',
    about: 'Über uns',
    services: 'Dienstleistungen',
    works: 'Arbeiten',
    blog: 'Blog',
    support: 'Unterstützung',
    contact: 'Kontakt',
    clientPortal: 'Kundenportal',
    learnMore: 'Mehr erfahren',
    getStarted: 'Loslegen',
    heroTitle: 'Träume in Designs verwandeln',
    heroSubtitle: 'Ihre Vision, Unsere Kunst',
    cookieConsentTitle: 'Wir verwenden Cookies',
    acceptAll: 'Alle akzeptieren',
    rejectAll: 'Alle ablehnen',
  },
  
  ja: {
    home: 'ホーム',
    about: '会社概要',
    services: 'サービス',
    works: '実績',
    blog: 'ブログ',
    support: 'サポート',
    contact: 'お問い合わせ',
    clientPortal: 'クライアントポータル',
    learnMore: '詳細を見る',
    getStarted: '始める',
    heroTitle: '夢をデザインに',
    heroSubtitle: 'あなたのビジョン、私たちのアート',
    cookieConsentTitle: 'Cookieを使用しています',
    acceptAll: 'すべて受け入れる',
    rejectAll: 'すべて拒否',
  },
  
  ar: {
    home: 'الرئيسية',
    about: 'حول',
    services: 'خدمات',
    works: 'أعمال',
    blog: 'مدونة',
    support: 'الدعم',
    contact: 'اتصل',
    clientPortal: 'بوابة العميل',
    learnMore: 'اعرف المزيد',
    getStarted: 'ابدأ',
    heroTitle: 'تحويل الأحلام إلى تصاميم',
    heroSubtitle: 'رؤيتك، فننا',
    cookieConsentTitle: 'نستخدم ملفات تعريف الارتباط',
    acceptAll: 'قبول الكل',
    rejectAll: 'رفض الكل',
  },
};

// Get translation
export function getTranslation(key: string, language: SupportedLanguage = 'en'): string {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      break;
    }
  }
  
  // Fallback to English if translation not found
  if (typeof value !== 'string') {
    value = translations.en;
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        break;
      }
    }
  }
  
  return typeof value === 'string' ? value : key;
}

// Detect language from locale
export function getLanguageFromLocale(locale: string): SupportedLanguage {
  const langCode = locale.split('-')[0].toLowerCase();
  
  const supportedLanguages: SupportedLanguage[] = ['en', 'hi', 'es', 'fr', 'de', 'ja', 'ar'];
  
  if (supportedLanguages.includes(langCode as SupportedLanguage)) {
    return langCode as SupportedLanguage;
  }
  
  return 'en'; // Default to English
}

// Get all available languages
export function getAvailableLanguages() {
  return [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  ];
}
