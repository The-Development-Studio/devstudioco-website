import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { X, Cookie, Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentProps {
  onNavigate: (page: string) => void;
}

export function CookieConsent({ onNavigate }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    functional: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const savedPrefs = JSON.parse(consent);
        setPreferences(savedPrefs);
      } catch (e) {
        console.error('Error parsing cookie preferences:', e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowSettings(false);
    setShowBanner(false);
  };

  const handleManageCookies = () => {
    setShowSettings(true);
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          >
            <div className="mx-auto max-w-7xl">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#FF6600]/10 rounded-full flex items-center justify-center">
                        <Cookie className="w-6 h-6 text-[#FF6600]" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-foreground mb-2">
                        We value your privacy
                      </h3>
                      <p className="text-muted-foreground">
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                        {' '}
                        <button
                          onClick={() => onNavigate('cookies-policy')}
                          className="text-[#FF6600] hover:underline"
                        >
                          Learn More
                        </button>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      onClick={handleManageCookies}
                      className="w-full sm:w-auto"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Manage Cookies
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleRejectAll}
                      className="w-full sm:w-auto"
                    >
                      Reject All
                    </Button>
                    <Button
                      onClick={handleAcceptAll}
                      className="bg-[#FF6600] hover:bg-[#FF6600]/90 w-full sm:w-auto"
                    >
                      Accept All
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Manage your cookie settings. You can enable or disable different types of cookies below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Necessary Cookies */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Label className="text-foreground">Necessary Cookies</Label>
                  <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                    Always Active
                  </span>
                </div>
                <p className="text-muted-foreground">
                  These cookies are essential for the website to function properly. They cannot be disabled.
                </p>
              </div>
              <Switch
                checked={preferences.necessary}
                disabled
                className="mt-1"
              />
            </div>

            {/* Functional Cookies */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1">
                <Label className="text-foreground mb-1 block">Functional Cookies</Label>
                <p className="text-muted-foreground">
                  These cookies enable enhanced functionality and personalization, such as language and currency preferences.
                </p>
              </div>
              <Switch
                checked={preferences.functional}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, functional: checked })
                }
                className="mt-1"
              />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1">
                <Label className="text-foreground mb-1 block">Analytics Cookies</Label>
                <p className="text-muted-foreground">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, analytics: checked })
                }
                className="mt-1"
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1">
                <Label className="text-foreground mb-1 block">Marketing Cookies</Label>
                <p className="text-muted-foreground">
                  These cookies are used to track visitors across websites to display relevant advertisements.
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, marketing: checked })
                }
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSavePreferences}
              className="bg-[#FF6600] hover:bg-[#FF6600]/90"
            >
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
