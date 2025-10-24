import { motion } from 'motion/react';
import { ParallaxWrapper, ParallaxLayer } from './ParallaxWrapper';
import { MagneticButton } from './MagneticButton';
import { SmoothReveal } from './SmoothReveal';

export function AnimationShowcase() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <SmoothReveal>
          <h1 className="text-4xl mb-4 text-center">Smooth Animations Demo</h1>
          <p className="text-center text-muted-foreground mb-12">
            Move your mouse around to see smooth parallax and magnetic effects
          </p>
        </SmoothReveal>

        {/* Parallax Wrapper Demo */}
        <SmoothReveal delay={0.2}>
          <div className="mb-12">
            <h2 className="text-2xl mb-4">Parallax Mouse Movement</h2>
            <ParallaxWrapper intensity={0.1} className="bg-card border border-border rounded-xl p-8">
              <div className="text-center">
                <h3 className="text-xl mb-2">This card follows your mouse!</h3>
                <p className="text-muted-foreground">
                  The entire card smoothly moves based on your cursor position
                </p>
              </div>
            </ParallaxWrapper>
          </div>
        </SmoothReveal>

        {/* Parallax Layers Demo */}
        <SmoothReveal delay={0.3}>
          <div className="mb-12">
            <h2 className="text-2xl mb-4">Layered Parallax Effect</h2>
            <div className="relative bg-card border border-border rounded-xl p-8 overflow-hidden h-64">
              <ParallaxLayer depth={0.5}>
                <div className="absolute top-4 left-4 w-32 h-32 bg-primary/10 rounded-full" />
              </ParallaxLayer>
              <ParallaxLayer depth={1}>
                <div className="absolute top-8 right-8 w-24 h-24 bg-primary/20 rounded-full" />
              </ParallaxLayer>
              <ParallaxLayer depth={1.5}>
                <div className="absolute bottom-4 left-1/2 w-16 h-16 bg-primary/30 rounded-full" />
              </ParallaxLayer>
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-center text-muted-foreground">
                  The circles move at different speeds creating depth
                </p>
              </div>
            </div>
          </div>
        </SmoothReveal>

        {/* Magnetic Button Demo */}
        <SmoothReveal delay={0.4}>
          <div className="mb-12">
            <h2 className="text-2xl mb-4">Magnetic Buttons</h2>
            <div className="flex gap-4 flex-wrap justify-center">
              <MagneticButton 
                className="px-6 py-3 bg-primary text-white rounded-lg"
                strength={0.3}
              >
                Hover Me!
              </MagneticButton>
              <MagneticButton 
                className="px-6 py-3 bg-card border border-border rounded-lg"
                strength={0.5}
              >
                Strong Magnet
              </MagneticButton>
              <MagneticButton 
                className="px-6 py-3 bg-primary/10 text-primary rounded-lg"
                strength={0.2}
              >
                Gentle Pull
              </MagneticButton>
            </div>
          </div>
        </SmoothReveal>

        {/* Smooth Reveal Demo */}
        <SmoothReveal delay={0.5}>
          <div className="mb-12">
            <h2 className="text-2xl mb-4">Scroll Reveal Animations</h2>
            <div className="space-y-4">
              <SmoothReveal direction="up">
                <div className="bg-card border border-border rounded-lg p-6">
                  Slides up smoothly
                </div>
              </SmoothReveal>
              <SmoothReveal direction="left">
                <div className="bg-card border border-border rounded-lg p-6">
                  Slides from left
                </div>
              </SmoothReveal>
              <SmoothReveal direction="right">
                <div className="bg-card border border-border rounded-lg p-6">
                  Slides from right
                </div>
              </SmoothReveal>
              <SmoothReveal direction="scale">
                <div className="bg-card border border-border rounded-lg p-6">
                  Scales in smoothly
                </div>
              </SmoothReveal>
            </div>
          </div>
        </SmoothReveal>

        {/* Floating Animation */}
        <SmoothReveal delay={0.6}>
          <div className="text-center">
            <h2 className="text-2xl mb-4">Floating Elements</h2>
            <div className="flex gap-8 justify-center items-center h-32">
              <motion.div
                className="w-16 h-16 bg-primary rounded-full"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="w-16 h-16 bg-primary/70 rounded-full"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              />
              <motion.div
                className="w-16 h-16 bg-primary/40 rounded-full"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }}
              />
            </div>
          </div>
        </SmoothReveal>
      </div>
    </div>
  );
}
