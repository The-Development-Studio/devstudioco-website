import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { testimonialsAPI } from '../utils/api';

interface Testimonial {
  id: number;
  name: string;
  designation: string;
  company: string;
  quote: string;
}

const defaultTestimonials: Testimonial[] = [];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    // Load testimonials from Supabase
    testimonialsAPI.getAll()
      .then(data => {
        if (data.testimonials && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
        }
      })
      .catch(e => {
        // Silently fail - database setup alert will handle this
        // Component will use defaultTestimonials (empty array) and hide itself
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Auto-advance carousel
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, testimonials.length - itemsPerView);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, itemsPerView]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, testimonials.length - itemsPerView);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, testimonials.length - itemsPerView);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="rounded-full w-12 h-12 bg-background shadow-lg hover:bg-primary hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>

          <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full w-12 h-12 bg-background shadow-lg hover:bg-primary hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Testimonials Carousel */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: `-${currentIndex * (100 / itemsPerView)}%`
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
            >
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={testimonial.id}
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 24 / itemsPerView}px)` }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-2 hover:border-primary/50">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4">
                        <Quote className="w-10 h-10 text-primary/20" />
                      </div>

                      <p className="text-muted-foreground mb-6 flex-grow italic">
                        "{testimonial.quote}"
                      </p>

                      <div className="pt-4 border-t border-border">
                        <h4 className="mb-1">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.designation}
                        </p>
                        <p className="text-sm text-primary">
                          {testimonial.company}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(testimonials.length / itemsPerView) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-border hover:bg-primary/50'
                }`}
                aria-label={`Go to testimonial group ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
