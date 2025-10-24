import { motion } from 'motion/react';
import { ArrowLeft, Cookie, Shield, Info, Settings } from 'lucide-react';
import { Button } from './ui/button';

interface CookiesPolicyPageProps {
  onNavigate: (page: string) => void;
}

export function CookiesPolicyPage({ onNavigate }: CookiesPolicyPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF6600] to-[#ff8534] text-white py-20">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                <Cookie className="w-8 h-8" />
              </div>
              <h1>Cookies Policy</h1>
            </div>
            <p className="text-white/90 max-w-3xl">
              Learn about how The Development Studio uses cookies and similar technologies
            </p>
            <p className="text-white/80 mt-2">
              Last Updated: October 15, 2025
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Introduction */}
            <section className="bg-card rounded-xl p-8 shadow-sm border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FF6600]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-6 h-6 text-[#FF6600]" />
                </div>
                <div>
                  <h2 className="mb-4">What Are Cookies?</h2>
                  <p className="text-muted-foreground mb-4">
                    Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
                  </p>
                  <p className="text-muted-foreground">
                    This Cookies Policy explains what cookies are, how we use them, the types of cookies we use, and how you can control your cookie preferences.
                  </p>
                </div>
              </div>
            </section>

            {/* Types of Cookies */}
            <section className="bg-card rounded-xl p-8 shadow-sm border border-border">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#FF6600]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="w-6 h-6 text-[#FF6600]" />
                </div>
                <div>
                  <h2>Types of Cookies We Use</h2>
                </div>
              </div>

              <div className="space-y-6">
                {/* Necessary Cookies */}
                <div className="pl-16">
                  <h3 className="mb-2">1. Necessary Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Examples:</strong> Session cookies, authentication cookies, load balancing cookies
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <strong>Can be disabled:</strong> No - These cookies cannot be disabled as they are necessary for the website to work.
                  </p>
                </div>

                {/* Functional Cookies */}
                <div className="pl-16">
                  <h3 className="mb-2">2. Functional Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies enable enhanced functionality and personalization, such as remembering your language preference, currency selection, and other customization options.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Examples:</strong> Language preference cookies, currency selection cookies, theme preferences
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <strong>Can be disabled:</strong> Yes - You can disable these cookies, but some features may not work as expected.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="pl-16">
                  <h3 className="mb-2">3. Analytics Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Examples:</strong> Google Analytics cookies, page visit tracking, user behavior analytics
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <strong>Can be disabled:</strong> Yes - You can opt out of analytics cookies without affecting your experience.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="pl-16">
                  <h3 className="mb-2">4. Marketing Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies are used to track visitors across websites to display relevant advertisements and measure the effectiveness of our marketing campaigns.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Examples:</strong> Advertising network cookies, retargeting cookies, social media cookies
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <strong>Can be disabled:</strong> Yes - You can opt out of marketing cookies at any time.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Cookies */}
            <section className="bg-card rounded-xl p-8 shadow-sm border border-border">
              <h2 className="mb-4">How We Use Cookies</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#FF6600] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    To remember your login information and keep you signed in
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#FF6600] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    To remember your language and currency preferences
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#FF6600] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    To understand how you use our website and improve our services
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#FF6600] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    To provide personalized content and recommendations
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#FF6600] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    To show you relevant advertisements
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#FF6600] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    To analyze website traffic and performance
                  </p>
                </div>
              </div>
            </section>

            {/* Managing Cookies */}
            <section className="bg-card rounded-xl p-8 shadow-sm border border-border">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#FF6600]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#FF6600]" />
                </div>
                <div>
                  <h2>Managing Your Cookie Preferences</h2>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  You have the right to decide whether to accept or reject cookies. You can manage your cookie preferences in several ways:
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#FF6600] rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      <strong>Cookie Banner:</strong> When you first visit our website, you can choose to accept or reject cookies through our cookie consent banner.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#FF6600] rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      <strong>Cookie Settings:</strong> You can manage your cookie preferences at any time by clicking the "Manage Cookies" button in the cookie banner.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#FF6600] rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      <strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies or to indicate when a cookie is being sent.
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mt-4">
                  Please note that if you choose to block all cookies, you may not be able to access all or parts of our website, and some features may not function properly.
                </p>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section className="bg-card rounded-xl p-8 shadow-sm border border-border">
              <h2 className="mb-4">Third-Party Cookies</h2>
              <p className="text-muted-foreground mb-4">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics of our website and deliver advertisements on and through our website.
              </p>
              <p className="text-muted-foreground">
                These third-party services have their own privacy policies and cookie policies. We encourage you to review their policies to understand how they use cookies and your information.
              </p>
            </section>

            {/* Updates */}
            <section className="bg-card rounded-xl p-8 shadow-sm border border-border">
              <h2 className="mb-4">Updates to This Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this Cookies Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
              </p>
              <p className="text-muted-foreground">
                We encourage you to review this policy periodically to stay informed about how we use cookies.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-[#FF6600] to-[#ff8534] rounded-xl p-8 text-white">
              <h2 className="mb-4 text-white">Questions About Cookies?</h2>
              <p className="text-white/90 mb-4">
                If you have any questions about our use of cookies, please don't hesitate to contact us:
              </p>
              <div className="space-y-2 text-white/90">
                <p>Email: info@devstudioco.com</p>
                <p>Phone: +91 8438028227</p>
                <p>Address: Nagapattinam, Tamil Nadu, India 609504</p>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
