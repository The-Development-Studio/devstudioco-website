import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface RefundPolicyPageProps {
  onNavigate: (page: string) => void;
}

const defaultContent = `
# Refund & Cancellation Policy

**Last Updated: October 14, 2025**

## Currency

All transactions are processed in **Indian Rupees (INR)** unless otherwise specified.

## Overview

The Development Studio is committed to client satisfaction. This policy outlines our refund and cancellation terms for various services.

## 1. Refund Eligibility

### Eligible for Refund
- Failure to deliver services as per agreement
- Significant deviation from agreed specifications
- Project cancellation before work commences
- Technical impossibility discovered before development

### Not Eligible for Refund
- Change in client requirements mid-project
- Client-side delays exceeding 30 days
- Work completed as per approved specifications
- Services already rendered or delivered

## 2. Project-Based Refunds

### Discovery & Consultation Phase
- **Full refund** if cancelled within 7 days
- **75% refund** if cancelled after discovery but before development
- **No refund** after development commences

### Development Phase
- **Pro-rata refund** based on work completed
- Completed milestones are non-refundable
- Work-in-progress evaluated for partial credit

### Post-Delivery
- **No refunds** after final delivery and acceptance
- Support issues covered under warranty
- Additional work quoted separately

## 3. Service-Specific Policies

### Custom Software Development
- Advance payment: 40% non-refundable after project kickoff
- Milestone payments: Non-refundable upon milestone completion
- Final payment: Due upon delivery acceptance

### Website Development
- Design phase: 30% non-refundable after approval
- Development phase: 40% non-refundable after approval
- Final 30%: Due upon launch

### Mobile App Development
- Discovery: 25% non-refundable
- Design: 25% non-refundable after approval
- Development: 30% non-refundable after testing
- Deployment: 20% due upon store submission

### E-Commerce Solutions
- Platform setup: 30% non-refundable
- Customization: 40% non-refundable after approval
- Integration & testing: 30% due upon launch

### Cyber Security Services
- Assessment: 100% due upon report delivery
- Implementation: Based on milestone completion
- Ongoing monitoring: Monthly, non-refundable

### Graphical Design Services
- Concept development: 40% non-refundable after presentation
- Revisions: Included as per agreement
- Final delivery: 60% due upon approval

## 4. Subscription Services

### Monthly Plans
- No refunds for current month
- Cancellation effective next billing cycle
- Pro-rata credit for annual plans

### Annual Plans
- Refund available within 30 days (less setup costs)
- After 30 days: Pro-rata refund of unused months
- Setup and customization costs non-refundable

## 5. Refund Process

### Request Procedure
1. Email refund request to: info@devstudioco.com
2. Include project details and reason
3. Provide supporting documentation
4. Allow 5-7 business days for review

### Processing Time
- Request review: 5-7 business days
- Approval notification: Within 24 hours of decision
- Refund processing: 7-14 business days
- Bank processing: 5-10 business days additional

### Refund Method
- Original payment method (preferred)
- Bank transfer for large amounts
- Store credit option available
- Processing fees may apply

## 6. Cancellation Policy

### By Client
- **Before Work Starts:** Full refund less 10% admin fee
- **During Discovery:** 75% refund
- **During Development:** Pro-rata based on completion
- **After Delivery:** No refund

### By Development Studio
- **Client Non-Payment:** Project suspended after 7 days
- **Scope Creep:** Renegotiation or termination
- **Client Unresponsiveness:** Auto-cancellation after 30 days

## 7. Dispute Resolution

### Internal Review
- First-level review by project manager
- Second-level review by management
- Final decision within 14 days

### External Resolution
- Mediation through mutually agreed mediator
- Arbitration in Tamil Nadu, India
- Legal action as last resort

## 8. Special Circumstances

### Force Majeure
- Natural disasters, pandemics, etc.
- Project suspended without penalty
- Resume when circumstances permit
- Mutual agreement on completion

### Technical Failure (Our End)
- Full refund of affected milestone
- Re-delivery at no additional cost
- Compensation for delays
- Priority support

## 9. Client Obligations for Refund

To qualify for refund, clients must:
- Provide detailed reasons for dissatisfaction
- Allow reasonable time for issue resolution
- Cooperate with review process
- Return all delivered materials and access

## 10. Payment Reversal

### Chargeback Notice
- Chargebacks incur ₹5,000 processing fee
- All services suspended immediately
- Legal action may be pursued
- Contact us before initiating chargeback

## 11. Warranties vs. Refunds

### Warranty Period
- Bug fixes: Free within warranty period
- Performance issues: Resolved at no cost
- Security patches: Applied promptly

### Beyond Warranty
- Maintenance contracts available
- Pay-per-incident support
- Enhancement requests quoted separately

## 12. Partial Services

- Partial delivery eligible for partial payment
- Completed modules remain with client
- Incomplete work credited toward refund
- Source code provided for paid portions

## 13. Good Faith Guarantee

We stand behind our work:
- Fair evaluation of all refund requests
- Open communication throughout
- Commitment to client satisfaction
- Reputation over revenue

## 14. Contact for Refunds

**Refund Requests:**  
Email: info@devstudioco.com  
Phone: +91 84380 28227, +91 84895 51887  
Address: Nagapattinam, Tamil Nadu, India 609504

**Response Time:** Within 48 hours

---

*This policy applies to services provided by The Development Studio. Individual project contracts may include specific terms that take precedence over this general policy. All amounts are in Indian Rupees (INR) unless specified otherwise.*
`;

export function RefundPolicyPage({ onNavigate }: RefundPolicyPageProps) {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    const stored = localStorage.getItem('refundPolicy');
    if (stored) {
      setContent(stored);
    }
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={() => onNavigate('home')} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl mb-4">Refund & Cancellation Policy</h1>
            <p className="text-xl text-muted-foreground">
              Transparent terms for refunds, cancellations, and payments (INR)
            </p>
          </motion.div>
        </div>
      </section>

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
