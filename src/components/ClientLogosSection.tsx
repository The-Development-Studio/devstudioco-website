import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { logosAPI } from '../utils/api';
import { useCountAnimation } from '../utils/useCountAnimation';

interface ClientLogo {
  id: number;
  name: string;
  image: string;
}

function AnimatedStatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountAnimation({ end: value, duration: 2 });

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl text-primary mb-2">
        {count}{suffix}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function ClientLogosSection() {
  const [logos, setLogos] = useState<ClientLogo[]>([]);

  useEffect(() => {
    // Load logos from Supabase
    logosAPI.getAll()
      .then(data => {
        if (data.logos && data.logos.length > 0) {
          setLogos(data.logos);
        }
      })
      .catch(e => {
        // Silently fail - database setup alert will handle this
        // Component will hide itself when no logos exist
      });
  }, []);

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  if (logos.length === 0) return null;

  return (
    <section className="py-16 border-y border-border bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-2">Trusted by Industry Leaders</h2>
          <p className="text-muted-foreground">
            Partnering with innovative companies worldwide
          </p>
        </motion.div>

        {/* Infinite Scrolling Logos */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-secondary/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-secondary/30 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-8 md:gap-12"
            animate={{
              x: [0, -100 * logos.length]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear'
              }
            }}
          >
            {duplicatedLogos.map((logo, idx) => (
              <div
                key={`${logo.id}-${idx}`}
                className="flex-shrink-0 w-32 h-20 md:w-40 md:h-24 flex items-center justify-center group"
              >
                <div className="relative w-full h-full bg-background rounded-lg p-4 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-105 border border-border">
                  {/* Logo placeholder with company name */}
                  <div className="text-center">
                    <div className="w-full h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded flex items-center justify-center mb-2">
                      <span className="text-xs text-primary font-bold opacity-50">LOGO</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{logo.name}</p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          <AnimatedStatItem value={500} suffix="+" label="Projects Completed" />
          <AnimatedStatItem value={300} suffix="+" label="Happy Clients" />
          <AnimatedStatItem value={50} suffix="+" label="Countries Served" />
          <AnimatedStatItem value={98} suffix="%" label="Client Satisfaction" />
        </motion.div>
      </div>
    </section>
  );
}
