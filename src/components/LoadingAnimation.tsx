import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function LoadingAnimation() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, []);

  const codeLines = [
    { text: 'import { React } from "react";', delay: 0 },
    { text: 'import { Design } from "@devstudio/core";', delay: 0.1 },
    { text: '', delay: 0.2 },
    { text: 'const buildApp = async () => {', delay: 0.3 },
    { text: '  console.log("Initializing Development Studio...");', delay: 0.4 },
    { text: '  const design = await createDesign();', delay: 0.5 },
    { text: '  const code = transform(design);', delay: 0.6 },
    { text: '  await deploy(code);', delay: 0.7 },
    { text: '  console.log("✓ Ready to craft your dreams!");', delay: 0.8 },
    { text: '};', delay: 0.9 },
    { text: '', delay: 1.0 },
    { text: 'export default buildApp;', delay: 1.1 }
  ];

  const syntaxHighlight = (line: string) => {
    const keywords = ['import', 'from', 'const', 'async', 'await', 'export', 'default'];
    const methods = ['console.log', 'createDesign', 'transform', 'deploy'];
    
    let result = line;
    
    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      result = result.replace(regex, `<span class="text-purple-500">${keyword}</span>`);
    });
    
    // Highlight strings
    result = result.replace(/"([^"]*)"/g, '<span class="text-green-500">"$1"</span>');
    
    // Highlight comments (if any)
    result = result.replace(/(\/\/.*)/g, '<span class="text-muted-foreground">$1</span>');
    
    return result;
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
    >
      <div className="relative w-full max-w-3xl px-4">
        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="bg-secondary/80 border-b border-border px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm text-muted-foreground ml-4 font-mono">devstudio.tsx</span>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              Building...
            </div>
          </div>

          {/* Code Content */}
          <div className="p-6 font-mono text-sm bg-card min-h-[400px]">
            {codeLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: line.delay, duration: 0.3 }}
                className="mb-1 flex"
              >
                <span className="text-muted-foreground mr-4 select-none inline-block w-8 text-right">
                  {line.text ? String(index + 1).padStart(2, '0') : ''}
                </span>
                <span 
                  className="text-foreground"
                  dangerouslySetInnerHTML={{ __html: syntaxHighlight(line.text) }}
                />
              </motion.div>
            ))}

            {/* Blinking Cursor */}
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-5 bg-primary ml-1 align-middle"
            />
          </div>

          {/* Progress Bar */}
          <div className="bg-secondary/80 border-t border-border px-4 py-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span className="font-mono">Crafting your experience...</span>
              <span className="text-primary font-mono">{progress}%</span>
            </div>
            <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-orange-400"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            <h2 className="text-3xl font-bold gradient-text mb-2">The Development Studio</h2>
          </motion.div>
          <p className="text-sm text-muted-foreground">Crafting Dreams into Designs: Your Vision, Our Artistry</p>
          
          {/* Loading dots */}
          <div className="flex justify-center items-center gap-1 mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
