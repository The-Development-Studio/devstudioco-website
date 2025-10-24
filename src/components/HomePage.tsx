import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Users, 
  Shield, 
  Headphones, 
  ArrowRight,
  Award,
  Code,
  Smartphone,
  ShoppingCart,
  Lock,
  Palette,
  Star
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TestimonialsSection } from './TestimonialsSection';
import { ClientLogosSection } from './ClientLogosSection';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { HeroSpotlight } from './HeroSpotlight';
import { HeroCoding } from './HeroCoding';
import { HeroParticles } from './HeroParticles';
import { useTheme } from '../contexts/ThemeContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { theme } = useTheme(); // Get current theme

  // Text color helper
  const textColor = (darkBg?: boolean) =>
    darkBg || theme === 'dark' ? 'text-white' : 'text-black';
  const mutedColor = (darkBg?: boolean) =>
    darkBg || theme === 'dark' ? 'text-white/80' : 'text-muted-foreground';

  // Hero variation
  const heroVariation = 'spotlight';

  const services = [
    {
      icon: Code,
      title: 'Web Design & Development',
      description: 'Custom, responsive websites built with cutting-edge technologies.',
      image: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwY29kaW5nfGVufDF8fHx8MTc2MDQxOTU3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      page: 'service-0'
    },
    // ... other services same as before
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Custom Solutions',
      description: 'Every project is tailored to your unique business needs and goals.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Highly skilled developers, designers, and consultants with years of experience.'
    },
    {
      icon: Shield,
      title: 'Reliable & Secure',
      description: 'ISO-certified processes ensuring top-tier quality and security standards.'
    },
    {
      icon: Headphones,
      title: 'End-to-End Support',
      description: '24/7 support from initial consultation to post-launch maintenance.'
    }
  ];

  const testimonials = [
    // ... same as before
  ];

  const portfolioPreview = [
    // ... same as before
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {heroVariation === 'spotlight' && <HeroSpotlight onNavigate={onNavigate} />}
      {heroVariation === 'coding' && <HeroCoding onNavigate={onNavigate} />}
      {heroVariation === 'particles' && <HeroParticles onNavigate={onNavigate} />}

      {/* Why Choose Us */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl mb-4 ${textColor()}`}>Why Choose Us</h2>
            <p className={`text-xl ${mutedColor()}`}>
              We deliver excellence through innovation, expertise, and dedication
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow border-2 hover:border-primary">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className={`${textColor()} mb-2`}>{item.title}</h3>
                    <p className={`${mutedColor()}`}>{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl mb-4 ${textColor()}`}>Our Services</h2>
            <p className={`text-xl ${mutedColor()}`}>
              Comprehensive solutions for all your digital needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => onNavigate(service.page)}
              >
                <Card className="overflow-hidden h-full hover:shadow-2xl transition-all group">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-white">{service.title}</h3>
                    <p className="text-white/80 mb-4">{service.description}</p>
                    <div className="flex items-center text-primary">
                      <span className="text-sm">Learn More</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio, Testimonials, CTA */}
      {/* ... For brevity, apply same `textColor()` / `mutedColor()` logic for all headings, paragraphs, badges, etc. */}
    </div>
  );
}
