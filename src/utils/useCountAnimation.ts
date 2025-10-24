import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface UseCountAnimationProps {
  end: number;
  duration?: number;
  startOnView?: boolean;
}

export function useCountAnimation({ 
  end, 
  duration = 2, 
  startOnView = true 
}: UseCountAnimationProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (startOnView && !isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation (easeOutQuart)
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
  }, [isInView, end, duration, startOnView]);

  return { count, ref };
}

// Helper function to parse string values like "500+", "98%", "50"
export function parseStatValue(value: string | number): { number: number; suffix: string } {
  if (typeof value === 'number') {
    return { number: value, suffix: '' };
  }

  const match = value.match(/^(\d+)(.*)$/);
  if (match) {
    return {
      number: parseInt(match[1], 10),
      suffix: match[2],
    };
  }

  return { number: 0, suffix: value };
}
