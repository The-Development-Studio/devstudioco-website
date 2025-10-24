import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Calendar,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { toast } from "sonner@2.0.3";
import { contactAPI } from "../utils/api";
import { HeroMinimal } from "./HeroMinimal";

export function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [consultationForm, setConsultationForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    details: "",
  });

  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contactAPI.submit({
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        message: contactForm.message,
        formType: "contact",
      });
      toast.success(
        "Thank you for contacting us! We'll get back to you within 24 hours.",
      );
      setContactForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
      console.error("Contact form error:", error);
    }
  };

  const handleConsultationSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();
    try {
      await contactAPI.submit({
        name: consultationForm.name,
        email: consultationForm.email,
        company: consultationForm.company,
        service: consultationForm.service,
        message: `Budget: ${consultationForm.budget}\nTimeline: ${consultationForm.timeline}\nDetails: ${consultationForm.details}`,
        formType: "consultation",
      });
      toast.success(
        "Consultation request submitted! We'll contact you to schedule a meeting.",
      );
      setConsultationForm({
        name: "",
        email: "",
        company: "",
        service: "",
        budget: "",
        timeline: "",
        details: "",
      });
    } catch (error) {
      toast.error(
        "Failed to submit request. Please try again.",
      );
      console.error("Consultation form error:", error);
    }
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contactAPI.submit({
        name: quoteForm.name,
        email: quoteForm.email,
        company: quoteForm.company,
        service: quoteForm.service,
        message: `Project Type: ${quoteForm.projectType}\nBudget: ${quoteForm.budget}\nTimeline: ${quoteForm.timeline}\nDescription: ${quoteForm.description}`,
        formType: "quote",
      });
      toast.success(
        "Quote request submitted! We'll send you a detailed proposal within 48 hours.",
      );
      setQuoteForm({
        name: "",
        email: "",
        company: "",
        service: "",
        projectType: "",
        budget: "",
        timeline: "",
        description: "",
      });
    } catch (error) {
      toast.error(
        "Failed to submit request. Please try again.",
      );
      console.error("Quote form error:", error);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <HeroMinimal
        icon={MessageSquare}
        title="Let's Start Your Digital Journey"
        subtitle="Get in Touch"
        description="Have a project in mind? We'd love to hear from you. Get in touch and let's make it happen."
        variant="gradient"
      />

      {/* Contact Info */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="mb-2">Email Us</h3>
                  <p className="text-sm text-muted-foreground">
                    info@devstudioco.com
                  </p>
                  <p className="text-sm text-muted-foreground">
                    supports@devstudioco.com
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="text-center hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="mb-2">Call Us</h3>
                  <p className="text-sm text-muted-foreground">
                    +91 8438028227 / +91 8489551887
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri 9AM-6PM EST
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="text-center hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="mb-2">Visit Us</h3>
                  <p className="text-sm text-muted-foreground">
                    Nagapattinam
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tamil Nadu, India, 609504
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs
            defaultValue="contact"
            className="max-w-4xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </TabsTrigger>
              <TabsTrigger value="consultation">
                <Calendar className="w-4 h-4 mr-2" />
                Consultation
              </TabsTrigger>
              <TabsTrigger value="quote">
                <DollarSign className="w-4 h-4 mr-2" />
                Get Quote
              </TabsTrigger>
            </TabsList>

            {/* Contact Form */}
            <TabsContent value="contact" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl mb-2">
                      Send us a Message
                    </h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back
                      to you as soon as possible.
                    </p>
                  </div>

                  <form
                    onSubmit={handleContactSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">
                          Full Name *
                        </Label>
                        <Input
                          id="contact-name"
                          required
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              name: e.target.value,
                            })
                          }
                          placeholder="Name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-email">
                          Email *
                        </Label>
                        <Input
                          id="contact-email"
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              email: e.target.value,
                            })
                          }
                          placeholder="name@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">
                        Phone Number
                      </Label>
                      <Input
                        id="contact-phone"
                        value={contactForm.phone}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+91 1234567890"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message">
                        Message *
                      </Label>
                      <Textarea
                        id="contact-message"
                        required
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            message: e.target.value,
                          })
                        }
                        placeholder="Tell us about your project..."
                        rows={6}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <Send className="mr-2 w-4 h-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Consultation Form */}
            <TabsContent value="consultation" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl mb-2">
                      Book a Free Consultation
                    </h2>
                    <p className="text-muted-foreground">
                      Schedule a call with our experts to
                      discuss your project requirements.
                    </p>
                  </div>

                  <form
                    onSubmit={handleConsultationSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="consult-name">
                          Full Name *
                        </Label>
                        <Input
                          id="consult-name"
                          required
                          value={consultationForm.name}
                          onChange={(e) =>
                            setConsultationForm({
                              ...consultationForm,
                              name: e.target.value,
                            })
                          }
                          placeholder="Name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="consult-email">
                          Email *
                        </Label>
                        <Input
                          id="consult-email"
                          type="email"
                          required
                          value={consultationForm.email}
                          onChange={(e) =>
                            setConsultationForm({
                              ...consultationForm,
                              email: e.target.value,
                            })
                          }
                          placeholder="name@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="consult-company">
                        Company Name
                      </Label>
                      <Input
                        id="consult-company"
                        value={consultationForm.company}
                        onChange={(e) =>
                          setConsultationForm({
                            ...consultationForm,
                            company: e.target.value,
                          })
                        }
                        placeholder="Your Company"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="consult-service">
                          Service Interested In *
                        </Label>
                        <Select
                          value={consultationForm.service}
                          onValueChange={(value) =>
                            setConsultationForm({
                              ...consultationForm,
                              service: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="web">
                              Web Design & Development
                            </SelectItem>
                            <SelectItem value="software">
                              Custom Software Solutions
                            </SelectItem>
                            <SelectItem value="mobile">
                              Mobile Applications
                            </SelectItem>
                            <SelectItem value="ecommerce">
                              E-Commerce Solutions
                            </SelectItem>
                            <SelectItem value="security">
                              Cyber Security
                            </SelectItem>
                            <SelectItem value="design">
                              Graphical Designing
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="consult-budget">
                          Estimated Budget
                        </Label>
                        <Select
                          value={consultationForm.budget}
                          onValueChange={(value) =>
                            setConsultationForm({
                              ...consultationForm,
                              budget: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5k">
                              ₹5,000 - ₹10,000
                            </SelectItem>
                            <SelectItem value="10k">
                              ₹10,000 - ₹25,000
                            </SelectItem>
                            <SelectItem value="25k">
                              ₹25,000 - ₹50,000
                            </SelectItem>
                            <SelectItem value="50k">
                              ₹50,000 - ₹100,000
                            </SelectItem>
                            <SelectItem value="100k">
                              ₹100,000+
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="consult-timeline">
                        Preferred Timeline
                      </Label>
                      <Select
                        value={consultationForm.timeline}
                        onValueChange={(value) =>
                          setConsultationForm({
                            ...consultationForm,
                            timeline: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">
                            ASAP (1-2 weeks)
                          </SelectItem>
                          <SelectItem value="soon">
                            Soon (1 month)
                          </SelectItem>
                          <SelectItem value="planned">
                            Planned (2-3 months)
                          </SelectItem>
                          <SelectItem value="flexible">
                            Flexible
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="consult-details">
                        Project Details
                      </Label>
                      <Textarea
                        id="consult-details"
                        value={consultationForm.details}
                        onChange={(e) =>
                          setConsultationForm({
                            ...consultationForm,
                            details: e.target.value,
                          })
                        }
                        placeholder="Tell us about your project vision and goals..."
                        rows={5}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <Calendar className="mr-2 w-4 h-4" />
                      Request Consultation
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Quote Form */}
            <TabsContent value="quote" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl mb-2">
                      Get a Detailed Quote
                    </h2>
                    <p className="text-muted-foreground">
                      Provide project details and receive a
                      comprehensive proposal within 48 hours.
                    </p>
                  </div>

                  <form
                    onSubmit={handleQuoteSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="quote-name">
                          Full Name *
                        </Label>
                        <Input
                          id="quote-name"
                          required
                          value={quoteForm.name}
                          onChange={(e) =>
                            setQuoteForm({
                              ...quoteForm,
                              name: e.target.value,
                            })
                          }
                          placeholder="Name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quote-email">
                          Email *
                        </Label>
                        <Input
                          id="quote-email"
                          type="email"
                          required
                          value={quoteForm.email}
                          onChange={(e) =>
                            setQuoteForm({
                              ...quoteForm,
                              email: e.target.value,
                            })
                          }
                          placeholder="name@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quote-company">
                        Company Name *
                      </Label>
                      <Input
                        id="quote-company"
                        required
                        value={quoteForm.company}
                        onChange={(e) =>
                          setQuoteForm({
                            ...quoteForm,
                            company: e.target.value,
                          })
                        }
                        placeholder="Your Company"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="quote-service">
                          Service Required *
                        </Label>
                        <Select
                          value={quoteForm.service}
                          onValueChange={(value) =>
                            setQuoteForm({
                              ...quoteForm,
                              service: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="web">
                              Web Design & Development
                            </SelectItem>
                            <SelectItem value="software">
                              Custom Software Solutions
                            </SelectItem>
                            <SelectItem value="mobile">
                              Mobile Applications
                            </SelectItem>
                            <SelectItem value="ecommerce">
                              E-Commerce Solutions
                            </SelectItem>
                            <SelectItem value="security">
                              Cyber Security
                            </SelectItem>
                            <SelectItem value="design">
                              Graphical Designing
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quote-type">
                          Project Type *
                        </Label>
                        <Select
                          value={quoteForm.projectType}
                          onValueChange={(value) =>
                            setQuoteForm({
                              ...quoteForm,
                              projectType: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">
                              New Project
                            </SelectItem>
                            <SelectItem value="redesign">
                              Redesign/Revamp
                            </SelectItem>
                            <SelectItem value="maintenance">
                              Maintenance & Support
                            </SelectItem>
                            <SelectItem value="integration">
                              Integration
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="quote-budget">
                          Budget Range *
                        </Label>
                        <Select
                          value={quoteForm.budget}
                          onValueChange={(value) =>
                            setQuoteForm({
                              ...quoteForm,
                              budget: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5k">
                              ₹5,000 - ₹10,000
                            </SelectItem>
                            <SelectItem value="10k">
                              ₹10,000 - ₹25,000
                            </SelectItem>
                            <SelectItem value="25k">
                              ₹25,000 - ₹50,000
                            </SelectItem>
                            <SelectItem value="50k">
                              ₹50,000 - ₹100,000
                            </SelectItem>
                            <SelectItem value="100k">
                              ₹100,000+
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quote-timeline">
                          Project Timeline *
                        </Label>
                        <Select
                          value={quoteForm.timeline}
                          onValueChange={(value) =>
                            setQuoteForm({
                              ...quoteForm,
                              timeline: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1month">
                              Less than 1 month
                            </SelectItem>
                            <SelectItem value="3months">
                              1-3 months
                            </SelectItem>
                            <SelectItem value="6months">
                              3-6 months
                            </SelectItem>
                            <SelectItem value="6plus">
                              6+ months
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quote-description">
                        Project Description *
                      </Label>
                      <Textarea
                        id="quote-description"
                        required
                        value={quoteForm.description}
                        onChange={(e) =>
                          setQuoteForm({
                            ...quoteForm,
                            description: e.target.value,
                          })
                        }
                        placeholder="Provide detailed information about your project requirements, goals, target audience, features needed, etc."
                        rows={6}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <DollarSign className="mr-2 w-4 h-4" />
                      Request Quote
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <h2 className="text-3xl md:text-4xl mb-4">
              Visit Our Office
            </h2>
            <p className="text-muted-foreground">
              Located in the heart of the tech district
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <Card className="overflow-hidden">
              <div className="h-96 bg-secondary/30 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Google Map Location
                    <br />
                    (Editable via Admin Panel)
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    123 Business Avenue, Tech District, City,
                    12345
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}