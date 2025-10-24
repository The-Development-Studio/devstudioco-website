import { motion } from 'motion/react';
import { ArrowRight, Award, Terminal } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';

interface HeroCodingProps {
  onNavigate: (page: string) => void;
}

const codeSnippets = [
  `const buildDreams = async () => {
  const vision = await getClientVision();
  const design = createInnovation(vision);
  return deploy(design);
};`,
  `function transformIdeas() {
  return innovation
    .map(idea => design(idea))
    .filter(isAmazing)
    .forEach(launch);
}`,
  `class DevelopmentStudio {
  craft() {
    this.dreams.forEach(dream => {
      this.design(dream);
      this.develop(dream);
      this.deliver(dream);
    });
  }
}`,
  `const solutions = {
  web: "Responsive & Modern",
  mobile: "Native & Cross-platform",
  enterprise: "Scalable & Secure",
  ecommerce: "Powerful & Fast"
};`,
];

export function HeroCoding({ onNavigate }: HeroCodingProps) {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const snippet = codeSnippets[currentSnippet];
    
    if (charIndex < snippet.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(snippet.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIndex(0);
        setDisplayedCode('');
        setCurrentSnippet((currentSnippet + 1) % codeSnippets.length);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentSnippet]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Matrix-like falling code lines */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/30 font-mono text-xs"
            initial={{
              x: `${(i * 7) % 100}%`,
              y: -100,
            }}
            animate={{
              y: ['0vh', '120vh'],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            {`</> ${Math.random().toString(36).substring(7)}`}
          </motion.div>
        ))}

        {/* Floating Code Blocks */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`block-${i}`}
            className="absolute bg-primary/5 border border-primary/20 rounded-lg p-4 backdrop-blur-sm font-mono text-xs text-primary/40"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 20 - 10,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              rotate: [null, Math.random() * 20 - 10],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {`{ code: "${Math.random() > 0.5 ? 'innovate' : 'create'}" }`}
          </motion.div>
        ))}

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 150, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -100, 0],
            y: [0, 120, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />

        {/* Binary Rain */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`binary-${i}`}
            className="absolute text-primary/20 font-mono text-sm"
            initial={{
              x: `${(i * 5.5) % 100}%`,
              y: -50,
            }}
            animate={{
              y: ['0vh', '110vh'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 3,
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </motion.div>
        ))}

        {/* Scanning Grid */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,102,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,102,0,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Code Terminal Sidebar */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full max-w-md p-8 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-black/80 backdrop-blur-md border border-primary/30 rounded-lg p-6 shadow-2xl shadow-primary/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="text-primary font-mono text-sm">terminal.tsx</span>
            <div className="flex gap-1 ml-auto">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <pre className="text-sm text-green-400 font-mono overflow-hidden">
            <code>
              {displayedCode}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-primary ml-1"
              />
            </code>
          </pre>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <Badge className="mb-6 bg-primary text-white px-6 py-3 text-base">
              <Award className="w-5 h-5 mr-2 inline" />
              ISO Certified Company
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight text-white font-mono">
              <motion.span 
                className="block mb-4"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(255,102,0,0)',
                    '0 0 20px rgba(255,102,0,0.5)',
                    '0 0 10px rgba(255,102,0,0)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                {'<Crafting Dreams />'}
              </motion.span>
              <span className="block">
                {'into '}
                <span className="text-primary font-extrabold relative">
                  {'{ Designs }'}
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </span>
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-gray-300 mb-6 font-light font-mono"
          >
            {'// Your Vision, Our Artistry'}
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
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 group font-mono"
            >
              {'execute("View Our Work")'}
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
              className="text-lg px-8 py-6 border-2 border-primary text-white hover:bg-primary hover:text-white font-mono"
            >
              {'initProject()'}
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
              { label: 'Projects', value: '50+', key: 'projects' },
              { label: 'Clients', value: '30+', key: 'clients' },
              { label: 'Team', value: '20+', key: 'team' },
              { label: 'Rate', value: '95%', key: 'success' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-primary/20"
              >
                <div className="text-xs text-primary/60 mb-2 font-mono">
                  {`const ${stat.key} =`}
                </div>
                <div className="text-4xl md:text-5xl text-primary mb-2 font-mono">
                  {`"${stat.value}"`}
                </div>
                <div className="text-sm md:text-base text-gray-400 font-mono">
                  {`// ${stat.label}`}
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
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
}
