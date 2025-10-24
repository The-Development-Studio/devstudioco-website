import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Users, Award, Coffee, Heart } from 'lucide-react';

interface StatItemProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: React.ComponentType<any>;
  duration?: number;
}

function StatItem({ end, suffix = '', prefix = '', label, icon: Icon, duration = 2 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <div className="mb-2">
        <span className="inline-block">
          {prefix}
          {count}
          {suffix}
        </span>
      </div>
      <p className="text-muted-foreground">{label}</p>
    </motion.div>
  );
}

export function StatsCounter() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Our Achievements</h2>
          <p className="text-xl text-muted-foreground">
            Numbers that speak for our excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <StatItem
            end={50}
            suffix="+"
            label="Projects Completed"
            icon={Award}
            duration={2.5}
          />
          <StatItem
            end={30}
            suffix="+"
            label="Happy Clients"
            icon={Users}
            duration={2.5}
          />
          <StatItem
            end={5}
            suffix="+"
            label="Years Experience"
            icon={Coffee}
            duration={2}
          />
          <StatItem
            end={98}
            suffix="%"
            label="Client Satisfaction"
            icon={Heart}
            duration={2.5}
          />
        </div>
      </div>
    </section>
  );
}
