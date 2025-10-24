import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface HeroMinimalProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: LucideIcon;
  variant?: 'default' | 'gradient' | 'dark';
}

export function HeroMinimal({ 
  title, 
  subtitle, 
  description, 
  icon: Icon,
  variant = 'default' 
}: HeroMinimalProps) {
  const getBackgroundClass = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-primary/10 via-background to-background';
      case 'dark':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-card';
    }
  };

  return (
    <section className={`relative py-32 overflow-hidden ${getBackgroundClass()}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Grid */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,102,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,102,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Floating Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />

        {/* Animated Lines */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{
              width: '100%',
              top: `${30 + i * 20}%`,
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {Icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                />
                <div className="relative w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/30">
                  <Icon className="w-10 h-10 text-primary" />
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: variant === 'dark' 
                    ? 'linear-gradient(90deg, #fff 0%, #FF6600 50%, #fff 100%)'
                    : 'linear-gradient(90deg, currentColor 0%, #FF6600 50%, currentColor 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {title}
              </motion.span>
            </h1>
          </motion.div>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-4"
            >
              {subtitle}
            </motion.p>
          )}

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {description}
            </motion.p>
          )}

          {/* Decorative underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
