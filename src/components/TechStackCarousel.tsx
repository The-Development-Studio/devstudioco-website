import { motion } from 'motion/react';

const technologies = [
  // Frontend
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'Angular', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  
  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Django', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'NestJS', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  
  // Mobile
  { name: 'React Native', category: 'Mobile' },
  { name: 'Flutter', category: 'Mobile' },
  { name: 'Swift', category: 'Mobile' },
  { name: 'Kotlin', category: 'Mobile' },
  
  // Database
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'MySQL', category: 'Database' },
  { name: 'Redis', category: 'Database' },
  { name: 'Supabase', category: 'Database' },
  
  // Cloud & DevOps
  { name: 'AWS', category: 'Cloud' },
  { name: 'Google Cloud', category: 'Cloud' },
  { name: 'Azure', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'GitHub Actions', category: 'DevOps' },
  
  // AI & ML
  { name: 'TensorFlow', category: 'AI/ML' },
  { name: 'PyTorch', category: 'AI/ML' },
  { name: 'OpenAI', category: 'AI/ML' },
  { name: 'LangChain', category: 'AI/ML' },
];

export function TechStackCarousel() {
  // Duplicate the array for seamless loop
  const duplicatedTechs = [...technologies, ...technologies];

  return (
    <section className="py-20 bg-card overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Our Technology Stack</h2>
          <p className="text-xl text-muted-foreground">
            Powered by cutting-edge technologies to deliver exceptional solutions
          </p>
        </motion.div>
      </div>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent z-10" />

        {/* Scrolling Container */}
        <motion.div
          className="flex gap-6"
          animate={{
            x: [0, -50 * technologies.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {duplicatedTechs.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 group"
            >
              <div className="px-8 py-4 bg-background border border-border rounded-lg hover:border-primary hover:shadow-lg transition-all duration-300 min-w-[200px]">
                <div className="text-center">
                  <p className="mb-1 group-hover:text-primary transition-colors">
                    {tech.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{tech.category}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Category Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mt-12"
      >
        <div className="flex flex-wrap justify-center gap-4">
          {['Frontend', 'Backend', 'Mobile', 'Database', 'Cloud', 'DevOps', 'AI/ML'].map((category) => (
            <div
              key={category}
              className="px-4 py-2 bg-primary/10 rounded-full text-sm text-primary"
            >
              {category}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
