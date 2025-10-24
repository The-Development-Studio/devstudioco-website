import { motion } from 'motion/react';
import { Calendar, Award, Globe, CheckCircle, Building2, Trophy } from 'lucide-react';
import { SmoothReveal } from './SmoothReveal';

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: any;
  stats?: string;
}

const milestones: Milestone[] = [
  {
    year: '2020',
    title: 'Company Founded',
    description: 'The Development Studio was established with a vision to transform ideas into digital reality.',
    icon: Building2,
    stats: 'Journey Begins'
  },
  {
    year: '2020-2023',
    title: '50+ Projects Delivered',
    description: 'Successfully delivered over 50 websites and corporate branding solutions to clients across various industries.',
    icon: CheckCircle,
    stats: '50+ Projects'
  },
  {
    year: '2023',
    title: 'Government Recognition',
    description: 'Officially recognized by the Government of India, marking a significant milestone in our journey.',
    icon: Award,
    stats: 'Gov. Certified'
  },
  {
    year: '2024',
    title: 'ISO Certification & Major Client',
    description: 'Achieved ISO certification and secured our first major enterprise client, validating our quality standards.',
    icon: Trophy,
    stats: 'ISO Certified'
  },
  {
    year: 'Present',
    title: 'Global Service Provider',
    description: 'Now serving clients worldwide, delivering cutting-edge web, mobile, and enterprise solutions globally.',
    icon: Globe,
    stats: 'Going Global'
  }
];

export function CompanyTimeline() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <SmoothReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4"
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Our Journey</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl mb-4">Company Milestones</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From a vision in 2020 to a globally recognized ISO-certified company, 
              our journey reflects dedication, innovation, and excellence.
            </p>
          </div>
        </SmoothReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />
          
          {/* Mobile Vertical Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent md:hidden" />

          {/* Milestones */}
          <div className="space-y-12 md:space-y-20">
            {milestones.map((milestone, index) => (
              <SmoothReveal key={index} delay={index * 0.1}>
                <div className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className={`flex-1 ${
                    index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow ml-12 md:ml-0"
                    >
                      {/* Year Badge */}
                      <div className={`inline-flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-full mb-4 ${
                        index % 2 === 0 ? 'md:float-right' : 'md:float-left'
                      }`}>
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{milestone.year}</span>
                      </div>

                      <div className="clear-both">
                        <h3 className="text-2xl mb-3">{milestone.title}</h3>
                        <p className="text-muted-foreground mb-4">
                          {milestone.description}
                        </p>
                        
                        {milestone.stats && (
                          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg">
                            <Trophy className="w-4 h-4" />
                            <span>{milestone.stats}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Icon - Desktop */}
                  <div className="absolute left-4 md:left-1/2 top-0 md:top-8 md:-translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                        delay: index * 0.1 + 0.2 
                      }}
                      className="relative"
                    >
                      {/* Outer glow ring */}
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-primary/20 rounded-full blur-md"
                      />
                      
                      {/* Icon container */}
                      <div className="relative w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                        <milestone.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for desktop */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </SmoothReveal>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <SmoothReveal delay={0.5}>
          <div className="mt-20 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <div className="bg-gradient-to-r from-primary to-primary/80 text-white px-8 py-6 rounded-2xl shadow-xl">
                <h3 className="text-2xl mb-2">The Journey Continues</h3>
                <p className="text-white/90 mb-4">
                  Join us as we continue to innovate and deliver excellence globally
                </p>
                <div className="flex flex-wrap gap-4 justify-center text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>ISO Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Gov. Recognized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>Global Service</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </SmoothReveal>
      </div>
    </section>
  );
}
