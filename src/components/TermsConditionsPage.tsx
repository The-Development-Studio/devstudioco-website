import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface TermsConditionsPageProps {
  onNavigate: (page: string) => void;
}

const defaultContent = `
# Terms & Conditions

**Last Updated: October 14, 2025**

## 1. Acceptance of Terms

By accessing and using The Development Studio's services, you accept and agree to be bound by the terms and provisions of this agreement.

## 2. Services Offered

The Development Studio provides:
- Custom software development
- Web and mobile application development
- E-commerce solutions
- Cyber security services
- Graphical design and branding
- IT consulting and support

## 3. Client Obligations

### Project Requirements
- Provide clear and detailed project requirements
- Supply necessary materials, content, and resources
- Respond to requests for information in a timely manner
- Review and approve deliverables within agreed timeframes

### Payment Terms
- Advance payment as per project agreement
- Milestone-based payments for larger projects
- Final payment upon project completion
- Late payment may incur additional charges

## 4. Our Commitments

We commit to:
- Deliver quality services as per specifications
- Maintain confidentiality of client information
- Provide post-deployment support as agreed
- Meet agreed-upon timelines and milestones

## 5. Intellectual Property

### Client Content
- Clients retain ownership of provided content
- Clients grant us license to use content for project delivery

### Deliverables
- Upon full payment, clients receive ownership of deliverables
- We retain rights to use project for portfolio purposes
- Custom code and designs become client property

### Our Property
- Pre-existing tools, frameworks, and libraries remain our property
- General knowledge and experience remain with our team

## 6. Confidentiality

Both parties agree to:
- Maintain confidentiality of sensitive information
- Not disclose proprietary information to third parties
- Use confidential information solely for project purposes
- Return or destroy confidential information upon request

## 7. Warranties and Disclaimers

### Our Warranties
- Services performed with professional skill and care
- Deliverables will conform to agreed specifications
- No infringement of third-party intellectual property

### Disclaimers
- Services provided "as is" for external dependencies
- No guarantee of specific business results
- Not responsible for client-provided content or data

## 8. Limitation of Liability

Our liability is limited to:
- Direct damages up to project value
- No liability for indirect or consequential damages
- Exceptions for willful misconduct or gross negligence

## 9. Project Timeline

- Timelines are estimates unless specified as fixed
- Delays due to client may extend delivery dates
- Force majeure events may affect timelines
- Timeline changes require mutual agreement

## 10. Termination

### By Client
- Termination with 15 days written notice
- Payment for completed work and expenses
- Delivery of work completed to date

### By Us
- For non-payment after 30 days
- For material breach of terms
- For project abandonment by client

## 11. Support and Maintenance

- Initial support period as per agreement
- Extended support available under separate terms
- Bug fixes within warranty period
- Feature enhancements as additional services

## 12. Dispute Resolution

- Good faith negotiations as first step
- Mediation through agreed mediator
- Jurisdiction: Courts of Tamil Nadu, India
- Governing law: Laws of India

## 13. Data Protection

We comply with:
- Indian IT Act 2000 and amendments
- International data protection standards
- ISO 27001 information security practices
- GDPR for European clients

## 14. Changes to Terms

- We may update these terms periodically
- Material changes communicated to active clients
- Continued use implies acceptance of changes
- Specific project contracts take precedence

## 15. Contact Information

For questions regarding these terms:

**The Development Studio**  
Email: info@devstudioco.com  
Phone: +91 84380 28227, +91 84895 51887  
Address: Nagapattinam, Tamil Nadu, India 609504

---

*By engaging our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.*
`;

export function TermsConditionsPage({ onNavigate }: TermsConditionsPageProps) {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    const stored = localStorage.getItem('termsConditions');
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
              <FileText className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl mb-4">Terms & Conditions</h1>
            <p className="text-xl text-muted-foreground">
              Our terms of service and client agreements
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
