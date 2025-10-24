import { motion } from 'motion/react';
import { 
  Code, 
  Award, 
  Smartphone, 
  ShoppingCart, 
  Lock, 
  Palette,
  CheckCircle2,
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { HeroService } from './HeroService';

interface ServicePageProps {
  serviceId: number;
  onNavigate: (page: string) => void;
}

const servicesData = [
  {
    id: 0,
    icon: Code,
    title: 'Web Design & Development',
    description: 'Transform your online presence with custom, responsive websites built using cutting-edge technologies and modern design principles.',
    image: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwY29kaW5nfGVufDF8fHx8MTc2MDQxOTU3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Responsive Design',
      'SEO Optimization',
      'Performance Optimization',
      'Content Management Systems',
      'E-Commerce Integration',
      'Progressive Web Apps'
    ],
    benefits: [
      'Increased online visibility and reach',
      'Better user engagement and conversion rates',
      'Mobile-friendly experiences',
      'Fast loading times and performance',
      'Easy content management',
      'Scalable architecture'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    caseStudies: [
      {
        company: 'TechCorp',
        result: '300% increase in conversion rate',
        description: 'Complete website redesign with focus on UX and performance'
      },
      {
        company: 'RetailPlus',
        result: '50% reduction in bounce rate',
        description: 'Mobile-first responsive design implementation'
      }
    ]
  },
  {
    id: 1,
    icon: Award,
    title: 'Custom Software Solutions',
    description: 'Tailored enterprise software designed to streamline your business operations and drive growth through intelligent automation.',
    image: 'https://images.unsplash.com/photo-1755541516450-644adb257ad0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MDQzNDcwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Custom Business Logic',
      'Third-party Integrations',
      'Workflow Automation',
      'Real-time Analytics',
      'Cloud-based Solutions',
      'API Development'
    ],
    benefits: [
      'Improved operational efficiency',
      'Reduced manual work and errors',
      'Better data insights and reporting',
      'Scalable to business growth',
      'Competitive advantage',
      'Cost savings over time'
    ],
    technologies: ['Python', 'Java', 'Node.js', 'AWS', 'Docker', 'Kubernetes'],
    caseStudies: [
      {
        company: 'LogisticsPro',
        result: '70% faster processing time',
        description: 'Custom warehouse management system'
      },
      {
        company: 'FinanceHub',
        result: '$2M annual cost savings',
        description: 'Automated financial reporting platform'
      }
    ]
  },
  {
    id: 2,
    icon: Smartphone,
    title: 'Mobile Applications',
    description: 'Native and cross-platform mobile apps that deliver exceptional user experiences on iOS and Android devices.',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYwMzk0Nzk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Native iOS & Android',
      'Cross-platform Development',
      'Offline Functionality',
      'Push Notifications',
      'In-app Purchases',
      'Social Media Integration'
    ],
    benefits: [
      'Reach mobile-first audience',
      'Increased customer engagement',
      'Brand presence on app stores',
      'Direct communication channel',
      'Revenue through mobile commerce',
      'Enhanced customer loyalty'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
    caseStudies: [
      {
        company: 'FitLife',
        result: '500K+ downloads in 6 months',
        description: 'Fitness tracking and wellness app'
      },
      {
        company: 'FoodDelivery',
        result: '4.8★ app store rating',
        description: 'On-demand food delivery platform'
      }
    ]
  },
  {
    id: 3,
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    description: 'Powerful online stores with seamless payment integration, inventory management, and exceptional shopping experiences.',
    image: 'https://images.unsplash.com/photo-1758522484646-c8694d1784fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZ3xlbnwxfHx8fDE3NjAzNDU0MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Shopping Cart & Checkout',
      'Payment Gateway Integration',
      'Inventory Management',
      'Order Tracking',
      'Multi-vendor Support',
      'Product Recommendations'
    ],
    benefits: [
      '24/7 sales capability',
      'Expanded market reach',
      'Lower operational costs',
      'Customer data insights',
      'Personalized shopping experience',
      'Automated order processing'
    ],
    technologies: ['Shopify', 'WooCommerce', 'Magento', 'Stripe', 'PayPal', 'Redis'],
    caseStudies: [
      {
        company: 'FashionHub',
        result: '400% revenue growth',
        description: 'Multi-vendor fashion marketplace'
      },
      {
        company: 'ElectroStore',
        result: '250K monthly transactions',
        description: 'Electronics e-commerce platform'
      }
    ]
  },
  {
    id: 4,
    icon: Lock,
    title: 'Cyber Security',
    description: 'Comprehensive security solutions to protect your digital assets, data, and infrastructure from evolving threats.',
    image: 'https://images.unsplash.com/photo-1760199789455-49098afd02f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjA0MzQzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Vulnerability Assessment',
      'Penetration Testing',
      'Security Audits',
      'Data Encryption',
      'Access Control',
      'Incident Response'
    ],
    benefits: [
      'Protected sensitive data',
      'Regulatory compliance',
      'Reduced security risks',
      'Customer trust and confidence',
      'Business continuity',
      'Prevention of financial losses'
    ],
    technologies: ['SSL/TLS', 'OAuth', 'JWT', 'Encryption', 'Firewall', 'IDS/IPS'],
    caseStudies: [
      {
        company: 'SecureBank',
        result: '100% compliance achieved',
        description: 'Complete security infrastructure overhaul'
      },
      {
        company: 'HealthData',
        result: 'Zero security incidents',
        description: 'HIPAA-compliant data protection system'
      }
    ]
  },
  {
    id: 5,
    icon: Palette,
    title: 'Graphical Designing',
    description: 'Creative designs that bring your brand identity to life through compelling visuals and user-centered experiences.',
    image: 'https://images.unsplash.com/photo-1740174459717-3833cb537bca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzYwNDE4OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Brand Identity Design',
      'UI/UX Design',
      'Logo & Marketing Materials',
      'Infographics',
      'Social Media Graphics',
      'Print & Digital Design'
    ],
    benefits: [
      'Strong brand recognition',
      'Professional appearance',
      'Better customer engagement',
      'Consistent brand message',
      'Increased credibility',
      'Competitive differentiation'
    ],
    technologies: ['Figma', 'Canva','Adobe Creative Suite', 'Sketch', 'InVision', 'Principle', 'Framer'],
    caseStudies: [
      {
        company: 'StartupX',
        result: 'Complete brand transformation',
        description: 'Full brand identity and design system'
      },
      {
        company: 'SocialApp',
        result: '85% user satisfaction',
        description: 'UI/UX redesign for mobile app'
      }
    ]
  }
];

export function ServicePage({ serviceId, onNavigate }: ServicePageProps) {
  const service = servicesData[serviceId];

  if (!service) {
    return <div>Service not found</div>;
  }

  const ServiceIcon = service.icon;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <HeroService
        icon={ServiceIcon}
        title={service.title}
        description={service.description}
        image={service.image}
        onNavigate={onNavigate}
      />

      {/* Features & Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="features" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all hover:border-primary">
                      <CardContent className="p-6">
                        <CheckCircle2 className="w-8 h-8 text-primary mb-3" />
                        <h3 className="mb-2">{feature}</h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all hover:border-primary">
                      <CardContent className="p-6">
                        <TrendingUp className="w-8 h-8 text-primary mb-3" />
                        <p className="text-muted-foreground">{benefit}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">Technologies We Use</h2>
            <p className="text-xl text-muted-foreground">
              Leveraging the latest and most reliable technologies
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {service.technologies.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Badge className="px-6 py-3 text-base bg-secondary text-foreground hover:bg-primary hover:text-white transition-colors cursor-pointer">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground">
              Real results for real businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {service.caseStudies.map((study, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <Card className="h-full hover:shadow-xl transition-all border-2 hover:border-primary">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 fill-primary text-primary" />
                      <Star className="w-5 h-5 fill-primary text-primary" />
                      <Star className="w-5 h-5 fill-primary text-primary" />
                      <Star className="w-5 h-5 fill-primary text-primary" />
                      <Star className="w-5 h-5 fill-primary text-primary" />
                    </div>
                    <h3 className="mb-2">{study.company}</h3>
                    <div className="text-2xl text-primary mb-4">{study.result}</div>
                    <p className="text-muted-foreground">{study.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Let's discuss how our {service.title.toLowerCase()} can help transform your business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => onNavigate('contact')}
              >
                Talk to Our Experts
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('works')}
                className="bg-transparent text-white border-white hover:bg-white hover:text-primary"
              >
                View Our Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
