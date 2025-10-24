import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, X, ExternalLink, ArrowRight, Loader2, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectsAPI } from '../utils/api';
import { HeroMinimal } from './HeroMinimal';

interface Project {
  id: number;
  title: string;
  category: string;
  tags: string[];
  image: string;
  challenge: string;
  solution: string;
  outcome: string;
  technologies: string[];
}

const categories = [
  'All',
  'Web Design & Development',
  'Custom Software',
  'Mobile Applications',
  'E-Commerce Solutions',
  'Cyber Security',
  'Graphical Designing'
];

export function WorksPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Load projects from Supabase
    setLoading(true);
    projectsAPI.getAll()
      .then(data => {
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects);
        }
      })
      .catch(e => {
        // Silently fail - database setup alert will handle this
        // Projects will remain empty and show empty state
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <HeroMinimal
        icon={Briefcase}
        title="Transforming Ideas into Reality"
        subtitle="Our Portfolio"
        description="Explore our diverse portfolio of successful projects across industries"
        variant="gradient"
      />

      {/* Filter Section */}
      <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-md z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="flex-shrink-0"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ExternalLink className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl mb-4">No Projects Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Projects will be added soon. Check back later to see our amazing work!
                </p>
                <p className="text-sm text-muted-foreground">
                  Admin: Add projects from the Admin Panel to showcase your portfolio
                </p>
              </div>
            </motion.div>
          ) : filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground">No projects found in this category</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card
                      className="h-full group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 overflow-hidden"
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white text-xl mb-2">{project.title}</h3>
                          <Badge variant="secondary" className="bg-primary/90 text-white border-0">
                            {project.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.slice(0, 3).map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {project.challenge}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                        >
                          View Details
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Project Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl">{selectedProject.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                {/* Project Image */}
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Category & Tags */}
                <div>
                  <Badge className="bg-primary text-white mb-3">{selectedProject.category}</Badge>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, i) => (
                      <Badge key={i} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>

                {/* Challenge */}
                <div>
                  <h4 className="text-xl mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">1</span>
                    The Challenge
                  </h4>
                  <p className="text-muted-foreground pl-10">{selectedProject.challenge}</p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="text-xl mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">2</span>
                    Our Solution
                  </h4>
                  <p className="text-muted-foreground pl-10">{selectedProject.solution}</p>
                </div>

                {/* Outcome */}
                <div>
                  <h4 className="text-xl mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">3</span>
                    The Outcome
                  </h4>
                  <p className="text-muted-foreground pl-10">{selectedProject.outcome}</p>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-xl mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="bg-secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how we can bring your vision to life with our expertise and dedication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline">
                View All Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
