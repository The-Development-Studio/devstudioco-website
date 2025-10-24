import { motion } from 'motion/react';
import { ArrowRight, Award, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useEffect, useState } from 'react';
import { useCountAnimation, parseStatValue } from '../utils/useCountAnimation';

interface HeroParticlesProps {
  onNavigate: (page: string) => void;
}

function AnimatedParticleStat({ value, label }: { value: string; label: string }) {
  const { number, suffix } = parseStatValue(value);
  const { count, ref } = useCountAnimation({ end: number, duration: 2.5 });

  return (
    <motion.div
      ref={ref}
      whileHover={{ 
        scale: 1.15,
        y: -10,
        transition: { type: "spring", stiffness: 300 }
      }}
      className="text-center relative"
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-primary/20 rounded-lg blur-xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      <div className="relative">
        <motion.div 
          className="text-4xl md:text-5xl text-primary mb-2"
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
          {count}{suffix}
        </motion.div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
    </motion.div>
  );
}

export function HeroParticles({ onNavigate }: HeroParticlesProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Interactive Parallax Layer */}
        <motion.div
          className="absolute inset-0"
          animate={{
            x: mousePosition.x * 0.05 - 2.5,
            y: mousePosition.y * 0.05 - 2.5,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          {/* Large Particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`large-${i}`}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, rgba(255,102,0,${Math.random() * 0.3 + 0.1}) 0%, transparent 70%)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </motion.div>

        {/* Sparkle Particles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -window.innerHeight - 100],
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 10,
            }}
          >
            <Sparkles 
              className="text-primary" 
              style={{
                width: Math.random() * 20 + 10,
                height: Math.random() * 20 + 10,
              }}
            />
          </motion.div>
        ))}

        {/* Glowing Dots */}
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-2 h-2 rounded-full bg-primary"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [null, Math.random() * -500 - 300],
              opacity: [null, 0],
              scale: [1, 0],
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 8,
            }}
          />
        ))}

        {/* Connecting Lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            style={{
              width: `${Math.random() * 300 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transformOrigin: 'center',
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Pulsing Rings */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border-2 border-primary/20"
            style={{
              width: 200 + i * 150,
              height: 200 + i * 150,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}

        {/* Gradient Waves */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 40%, rgba(255,102,0,0.15) 0%, transparent 50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 70% 60%, rgba(255,102,0,0.1) 0%, transparent 50%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Mesh Grid */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,102,0,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,102,0,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          >
            <Badge className="mb-6 bg-primary text-white px-6 py-3 text-base shadow-xl shadow-primary/40">
              <Award className="w-5 h-5 mr-2 inline" />
              ISO Certified Company
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight text-white">
              <motion.span 
                className="block mb-4"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #fff 0%, #FF6600 25%, #fff 50%, #FF6600 75%, #fff 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Crafting Dreams
              </motion.span>
              <span className="block">
                into{' '}
                <motion.span
                  className="inline-block text-primary font-extrabold relative"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(255,102,0,0.5), 0 0 40px rgba(255,102,0,0.3)',
                      '0 0 40px rgba(255,102,0,0.8), 0 0 60px rgba(255,102,0,0.5)',
                      '0 0 20px rgba(255,102,0,0.5), 0 0 40px rgba(255,102,0,0.3)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Designs
                  {/* Glowing underline */}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-1 bg-primary blur-sm"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scaleX: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => onNavigate('works')}
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 group shadow-2xl shadow-primary/50"
              >
                View Our Work
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('contact')}
                className="text-lg px-8 py-6 border-2 border-primary text-white hover:bg-primary hover:text-white shadow-xl"
              >
                Start Your Project
              </Button>
            </motion.div>
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
              <motion.div
                key={idx}
                whileHover={{ 
                  scale: 1.15,
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="text-center relative"
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-lg blur-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <div className="relative">
                  <motion.div 
                    className="text-4xl md:text-5xl text-primary mb-2"
                    animate={{
                      textShadow: [
                        '0 0 10px rgba(255,102,0,0.5)',
                        '0 0 20px rgba(255,102,0,0.8)',
                        '0 0 10px rgba(255,102,0,0.5)',
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.3
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm md:text-base text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center shadow-lg shadow-primary/50">
          <motion.div 
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{
              opacity: [1, 0.3, 1],
              height: ['12px', '6px', '12px'],
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
