import { motion } from 'motion/react';
import { ArrowRight, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';
import { useCountAnimation, parseStatValue } from '../utils/useCountAnimation';

interface HeroSpotlightProps {
  onNavigate: (page: string) => void;
}

function AnimatedHeroStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const { number, suffix } = parseStatValue(value);
  const { count, ref } = useCountAnimation({ end: number, duration: 2.5 });

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.1, y: -5 }}
      className="text-center"
    >
      <motion.div 
        className="text-4xl md:text-5xl text-primary mb-2"
        animate={{
          textShadow: [
            '0 0 10px rgba(255,102,0,0.3)',
            '0 0 20px rgba(255,102,0,0.6)',
            '0 0 10px rgba(255,102,0,0.3)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay
        }}
      >
        {count}{suffix}
      </motion.div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  );
}

export function HeroSpotlight({ onNavigate }: HeroSpotlightProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Moving Spotlight Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Interactive Spotlight */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,102,0,0.4) 0%, rgba(255,102,0,0.2) 25%, transparent 70%)`,
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            pointerEvents: 'none',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Animated Spotlight 1 */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,102,0,0.3) 0%, rgba(255,102,0,0.15) 30%, transparent 60%)`,
          }}
          animate={{
            x: ['-20%', '120%'],
            y: ['20%', '80%'],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Animated Spotlight 2 */}
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,102,0,0.25) 0%, rgba(255,102,0,0.12) 35%, transparent 65%)`,
          }}
          animate={{
            x: ['120%', '-20%'],
            y: ['80%', '20%'],
            scale: [1.2, 0.8, 1.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
        />

        {/* Animated Spotlight 3 */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,102,0,0.35) 0%, rgba(255,102,0,0.18) 30%, transparent 60%)`,
          }}
          animate={{
            x: ['50%', '-10%', '50%'],
            y: ['-10%', '110%', '-10%'],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,102,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,102,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Scanning Lines */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,102,0,0.5) 50%, transparent 100%)',
            height: '200px',
          }}
          animate={{
            y: ['-200px', '100vh'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.7 + 0.3,
              scale: Math.random() * 2 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -800],
              x: [null, Math.random() * 200 - 100],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Vignette Effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <Badge className="mb-6 bg-primary text-white px-6 py-3 text-base border-2 border-primary/50 shadow-lg shadow-primary/20">
              <Award className="w-5 h-5 mr-2 inline" />
              ISO Certified Company
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight text-white">
              <span className="block mb-4">Crafting Dreams</span>
              <span className="block">
                into{' '}
                <motion.span
                  className="relative inline-block"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(255,102,0,0.5)',
                      '0 0 40px rgba(255,102,0,0.8)',
                      '0 0 20px rgba(255,102,0,0.5)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-primary font-extrabold">Designs</span>
                </motion.span>
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-gray-300 mb-6 font-light"
          >
            Your Vision, Our Artistry
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            We design, develop, and deploy innovative web, mobile, and enterprise software solutions tailored for your business success.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-6 justify-center"
          >
            <Button
              size="lg"
              onClick={() => onNavigate('works')}
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 group shadow-lg shadow-primary/30"
            >
              View Our Work
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.div>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('contact')}
              className="text-lg px-8 py-6 border-2 border-primary text-white hover:bg-primary hover:text-white shadow-lg"
            >
              Start Your Project
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {[
              { label: 'Projects', value: '50+' },
              { label: 'Clients', value: '30+' },
              { label: 'Team Members', value: '20+' },
              { label: 'Success Rate', value: '95%' },
            ].map((stat, idx) => (
              <AnimatedHeroStat
                key={idx}
                value={stat.value}
                label={stat.label}
                delay={idx * 0.2}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center shadow-lg shadow-primary/30">
          <motion.div 
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
