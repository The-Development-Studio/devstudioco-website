import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SmoothRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
}

const variants = {
  up: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  down: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  },
  left: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  right: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }
};

export function SmoothReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = ''
}: SmoothRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredRevealProps {
  children: ReactNode[];
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  staggerDelay?: number;
  className?: string;
}

export function StaggeredReveal({
  children,
  direction = 'up',
  staggerDelay = 0.1,
  className = ''
}: StaggeredRevealProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <SmoothReveal
          key={index}
          direction={direction}
          delay={index * staggerDelay}
        >
          {child}
        </SmoothReveal>
      ))}
    </div>
  );
}
