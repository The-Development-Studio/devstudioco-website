import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Book, 
  MessageCircle, 
  FileText, 
  HelpCircle,
  ChevronDown,
  ExternalLink,
  Lock,
  Shield,
  User,
  ArrowRight,
  Headphones
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { HeroMinimal } from './HeroMinimal';

const knowledgeBaseCategories = [
  {
    title: 'Getting Started',
    icon: Book,
    articles: [
      { title: 'How to create an account', views: '2.5K' },
      { title: 'Setting up your first project', views: '1.8K' },
      { title: 'Understanding our pricing', views: '3.2K' },
      { title: 'Basic navigation guide', views: '1.5K' }
    ]
  },
  {
    title: 'Technical Documentation',
    icon: FileText,
    articles: [
      { title: 'API Documentation', views: '5.2K' },
      { title: 'Integration guides', views: '2.9K' },
      { title: 'Security best practices', views: '3.5K' },
      { title: 'Performance optimization', views: '2.1K' }
    ]
  },
  {
    title: 'Troubleshooting',
    icon: HelpCircle,
    articles: [
      { title: 'Common error messages', views: '4.1K' },
      { title: 'Login issues', views: '2.3K' },
      { title: 'Payment problems', views: '1.9K' },
      { title: 'Performance issues', views: '1.7K' }
    ]
  }
];

const faqs = [
  {
    question: 'What services does The Development Studio offer?',
    answer: 'We offer six core services: Web Design & Development, Custom Software Solutions, Mobile Applications, E-Commerce Solutions, Cyber Security, and Graphical Designing. Each service is tailored to meet your specific business needs.'
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary depending on scope and complexity. A simple website might take 4-6 weeks, while a complex enterprise solution could take 3-6 months. We provide detailed timelines during the consultation phase.'
  },
  {
    question: 'Do you provide ongoing support after project completion?',
    answer: 'Yes! We offer comprehensive post-launch support including maintenance, updates, bug fixes, and technical assistance. We have various support packages to suit different needs.'
  },
  {
    question: 'What is your development process?',
    answer: 'We follow an agile methodology: Discovery & Planning → Design → Development → Testing → Deployment → Support. We keep you involved throughout with regular updates and demos.'
  },
  {
    question: 'Can you work with our existing systems?',
    answer: 'Absolutely! We specialize in integrating with existing systems and can work with various platforms, APIs, and technologies to ensure seamless integration.'
  },
  {
    question: 'What makes The Development Studio different?',
    answer: 'We\'re ISO-certified, have 10+ years of experience, maintain a 95% client satisfaction rate, and treat every project as our own. We combine technical expertise with business understanding.'
  },
  {
    question: 'Do you offer free consultations?',
    answer: 'Yes, we offer a free initial consultation to discuss your project requirements, provide recommendations, and create a preliminary proposal.'
  },
  {
    question: 'What are your payment terms?',
    answer: 'We typically work with a milestone-based payment structure: 30% upfront, 40% at mid-project, and 30% upon completion. Custom payment plans are available for larger projects.'
  }
];

interface SupportPageProps {
  onNavigate?: (page: string) => void;
}

export function SupportPage({ onNavigate }: SupportPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: ''
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
    setTicketForm({ name: '', email: '', category: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <HeroMinimal
        icon={Headphones}
        title="How Can We Help You?"
        subtitle="Support Center"
        description="Search our knowledge base or get in touch with our support team"
        variant="gradient"
      />

      {/* Search Bar Section */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-all hover:border-primary cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2">Knowledge Base</h3>
                <p className="text-sm text-muted-foreground">Browse articles and guides</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:border-primary cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Chat with our support team</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:border-primary cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2">Submit Ticket</h3>
                <p className="text-sm text-muted-foreground">Get personalized support</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="knowledge" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
              <TabsTrigger value="faq">FAQs</TabsTrigger>
              <TabsTrigger value="ticket">Submit Ticket</TabsTrigger>
            </TabsList>

            {/* Knowledge Base Tab */}
            <TabsContent value="knowledge" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {knowledgeBaseCategories.map((category, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <category.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="mb-4">{category.title}</h3>
                        <ul className="space-y-3">
                          {category.articles.map((article, i) => (
                            <li key={i}>
                              <a href="#" className="group flex items-start justify-between text-sm hover:text-primary transition-colors">
                                <span className="flex-1">{article.title}</span>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span className="text-xs text-muted-foreground">{article.views}</span>
                                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="mb-8 text-center">
                  <h2 className="text-3xl mb-2">Frequently Asked Questions</h2>
                  <p className="text-muted-foreground">Quick answers to common questions</p>
                </div>

                <Accordion type="single" collapsible className="max-w-3xl mx-auto">
                  {faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`}>
                      <AccordionTrigger className="text-left">
                        <span className="flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{faq.question}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pl-8">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </TabsContent>

            {/* Submit Ticket Tab */}
            <TabsContent value="ticket" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="max-w-2xl mx-auto">
                  <div className="mb-8 text-center">
                    <h2 className="text-3xl mb-2">Submit a Support Ticket</h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you within 24 hours
                    </p>
                  </div>

                  <Card>
                    <CardContent className="p-8">
                      <form onSubmit={handleTicketSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              required
                              value={ticketForm.name}
                              onChange={(e) => setTicketForm({...ticketForm, name: e.target.value})}
                              placeholder="John Doe"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              value={ticketForm.email}
                              onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                              placeholder="your.email@domain.com"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category">Category *</Label>
                          <Select
                            value={ticketForm.category}
                            onValueChange={(value) => setTicketForm({...ticketForm, category: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technical">Technical Support</SelectItem>
                              <SelectItem value="billing">Billing & Payments</SelectItem>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="bug">Bug Report</SelectItem>
                              <SelectItem value="feature">Feature Request</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            required
                            value={ticketForm.subject}
                            onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                            placeholder="Brief description of your issue"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            required
                            value={ticketForm.message}
                            onChange={(e) => setTicketForm({...ticketForm, message: e.target.value})}
                            placeholder="Please provide as much detail as possible..."
                            rows={6}
                          />
                        </div>

                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                          Submit Ticket
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Client Portal Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary text-white">Secure Portal</Badge>
              <h2 className="text-3xl md:text-4xl mb-4">
                Client Portal Access
              </h2>
              <p className="text-xl text-muted-foreground">
                Secure access to your projects, invoices, and communications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="hover:shadow-lg transition-all border-2 hover:border-primary">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="mb-2">Secure Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Protected with OTP-based authentication for maximum security
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all border-2 hover:border-primary">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="mb-2">Project Management</h3>
                  <p className="text-sm text-muted-foreground">
                    View project progress, timelines, and deliverables in real-time
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all border-2 hover:border-primary">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="mb-2">Direct Communication</h3>
                  <p className="text-sm text-muted-foreground">
                    Chat directly with your project team and get instant updates
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Card className="max-w-2xl mx-auto border-2 border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl mb-4">Access Your Client Portal</h3>
                  <p className="text-muted-foreground mb-6">
                    Login to manage your projects, view invoices, track milestones, and communicate with your dedicated team.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => onNavigate?.('client-portal')}
                    >
                      <Shield className="mr-2 w-5 h-5" />
                      Login to Portal
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      onClick={() => onNavigate?.('client-portal')}
                    >
                      Register New Account
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    <Lock className="w-3 h-3 inline mr-1" />
                    Protected with OTP verification • Bank-grade encryption
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl mb-4">Still Need Help?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our support team is available 24/7 to assist you
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <MessageCircle className="mr-2 w-5 h-5" />
                Start Live Chat
              </Button>
              <Button size="lg" variant="outline">
                Email Support
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Average response time: Less than 2 hours
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
