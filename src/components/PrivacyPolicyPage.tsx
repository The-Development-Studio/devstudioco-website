import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface PrivacyPolicyPageProps {
  onNavigate: (page: string) => void;
}

const defaultContent = `
# Privacy Policy

**Last Updated: October 14, 2025**

## Introduction

The Development Studio ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.

## Information We Collect

### Personal Information
- Name and contact information (email, phone number)
- Company name and business information
- Billing and payment information
- Project requirements and specifications

### Automatically Collected Information
- IP address and browser type
- Pages visited and time spent on our site
- Device information and operating system
- Cookies and similar tracking technologies

## How We Use Your Information

We use the collected information to:
- Provide and maintain our services
- Process your transactions and manage orders
- Send administrative information and updates
- Respond to inquiries and provide customer support
- Improve our website and services
- Send marketing communications (with your consent)

## Data Protection

We implement appropriate technical and organizational security measures to protect your personal information, including:
- Encryption of sensitive data
- Regular security assessments
- Access controls and authentication
- Secure data storage and transmission

## Your Rights

You have the right to:
- Access your personal information
- Correct inaccurate data
- Request deletion of your data
- Object to processing of your information
- Withdraw consent at any time

## Cookies Policy

We use cookies to enhance your browsing experience. You can control cookie preferences through your browser settings.

## Third-Party Services

We may use third-party services for:
- Payment processing
- Analytics and performance monitoring
- Email marketing
- Cloud storage and hosting

## Data Retention

We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.

## Children's Privacy

Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.

## Changes to This Policy

We may update this Privacy Policy periodically. We will notify you of any changes by posting the new policy on this page with an updated date.

## Contact Us

If you have questions about this Privacy Policy, please contact us:

**Email:** info@devstudioco.com  
**Phone:** +91 84380 28227  
**Address:** Nagapattinam, Tamil Nadu, India 609504

---

*This policy complies with applicable data protection laws including GDPR and India's IT Act 2000.*
`;

export function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    // Load custom content from localStorage (admin managed)
    const stored = localStorage.getItem('privacyPolicy');
    if (stored) {
      setContent(stored);
    }
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Your privacy and data security are our top priorities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-slate max-w-none">
                  {content.split('\n').map((line, idx) => {
                    if (line.startsWith('# ')) {
                      return <h1 key={idx} className="text-3xl mb-4">{line.substring(2)}</h1>;
                    }
                    if (line.startsWith('## ')) {
                      return <h2 key={idx} className="text-2xl mt-8 mb-4">{line.substring(3)}</h2>;
                    }
                    if (line.startsWith('### ')) {
                      return <h3 key={idx} className="text-xl mt-6 mb-3">{line.substring(4)}</h3>;
                    }
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <p key={idx} className="mb-4"><strong>{line.substring(2, line.length - 2)}</strong></p>;
                    }
                    if (line.startsWith('- ')) {
                      return <li key={idx} className="ml-6 mb-2">{line.substring(2)}</li>;
                    }
                    if (line.startsWith('*') && line.endsWith('*')) {
                      return <p key={idx} className="text-sm text-muted-foreground italic mb-4">{line.substring(1, line.length - 1)}</p>;
                    }
                    if (line.startsWith('---')) {
                      return <hr key={idx} className="my-8 border-border" />;
                    }
                    if (line.trim()) {
                      return <p key={idx} className="mb-4 text-muted-foreground">{line}</p>;
                    }
                    return <br key={idx} />;
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
