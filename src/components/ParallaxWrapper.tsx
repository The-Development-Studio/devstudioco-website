import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, ReactNode } from 'react';

interface ParallaxWrapperProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
}

export function ParallaxWrapper({ children, intensity = 0.05, className = '' }: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(useTransform(mouseX, [-1, 1], [-20 * intensity, 20 * intensity]), springConfig);
  const y = useSpring(useTransform(mouseY, [-1, 1], [-20 * intensity, 20 * intensity]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  depth?: number;
  className?: string;
}

export function ParallaxLayer({ children, depth = 1, className = '' }: ParallaxLayerProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20 };
  const x = useSpring(useTransform(mouseX, [-1, 1], [-10 * depth, 10 * depth]), springConfig);
  const y = useSpring(useTransform(mouseY, [-1, 1], [-10 * depth, 10 * depth]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ x, y }}
      className={`parallax-layer ${className}`}
    >
      {children}
    </motion.div>
  );
}
