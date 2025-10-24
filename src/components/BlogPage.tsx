import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, Tag, Search, ArrowRight, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const blogPosts = [
  {
    id: 1,
    title: '10 Web Development Trends to Watch in 2025',
    excerpt: 'Discover the latest trends shaping the future of web development, from AI integration to progressive web apps.',
    author: 'John Doe',
    date: 'October 12, 2025',
    readTime: '5 min read',
    category: 'Web Development',
    tags: ['Trends', 'Web Dev', 'AI'],
    image: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwY29kaW5nfGVufDF8fHx8MTc2MDQxOTU3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true
  },
  {
    id: 2,
    title: 'Building Secure Mobile Applications: A Complete Guide',
    excerpt: 'Learn best practices for securing your mobile apps and protecting user data from potential threats.',
    author: 'Jane Smith',
    date: 'October 10, 2025',
    readTime: '8 min read',
    category: 'Mobile Development',
    tags: ['Security', 'Mobile', 'Best Practices'],
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYwMzk0Nzk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true
  },
  {
    id: 3,
    title: 'The ROI of Custom Software Development',
    excerpt: 'Understanding the long-term value and return on investment of custom software solutions for your business.',
    author: 'Mike Johnson',
    date: 'October 8, 2025',
    readTime: '6 min read',
    category: 'Business',
    tags: ['ROI', 'Custom Software', 'Business'],
    image: 'https://images.unsplash.com/photo-1755541516450-644adb257ad0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MDQzNDcwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  },
  {
    id: 4,
    title: 'E-Commerce Best Practices for 2025',
    excerpt: 'Maximize your online store\'s potential with these proven e-commerce strategies and optimization techniques.',
    author: 'Sarah Wilson',
    date: 'October 5, 2025',
    readTime: '7 min read',
    category: 'E-Commerce',
    tags: ['E-Commerce', 'Optimization', 'Sales'],
    image: 'https://images.unsplash.com/photo-1758522484646-c8694d1784fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZ3xlbnwxfHx8fDE3NjAzNDU0MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  },
  {
    id: 5,
    title: 'Understanding Cyber Security Threats in 2025',
    excerpt: 'Stay ahead of evolving cyber threats with our comprehensive guide to modern security challenges.',
    author: 'Tom Anderson',
    date: 'October 3, 2025',
    readTime: '10 min read',
    category: 'Cyber Security',
    tags: ['Security', 'Threats', 'Protection'],
    image: 'https://images.unsplash.com/photo-1760199789455-49098afd02f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjA0MzQzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  },
  {
    id: 6,
    title: 'The Power of Design Systems',
    excerpt: 'How implementing a design system can streamline your product development and improve consistency.',
    author: 'Emily Chen',
    date: 'October 1, 2025',
    readTime: '5 min read',
    category: 'Design',
    tags: ['Design Systems', 'UI/UX', 'Branding'],
    image: 'https://images.unsplash.com/photo-1740174459717-3833cb537bca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzYwNDE4OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  }
];

const categories = ['All', 'Web Development', 'Mobile Development', 'Business', 'E-Commerce', 'Cyber Security', 'Design'];

const popularTags = ['Web Dev', 'Security', 'Mobile', 'AI', 'E-Commerce', 'UI/UX', 'Cloud', 'DevOps'];

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPosts = blogPosts.filter(post => post.featured);
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-6 bg-primary text-white">Blog & Insights</Badge>
            <h1 className="text-4xl md:text-6xl mb-6">
              Knowledge & <span className="text-primary">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stay updated with the latest trends, tips, and insights from our expert team
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts Carousel */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4">Featured Articles</h2>
          </motion.div>

          <Carousel className="max-w-6xl mx-auto">
            <CarouselContent>
              {featuredPosts.map((post) => (
                <CarouselItem key={post.id}>
                  <Card className="overflow-hidden border-2 hover:border-primary transition-all">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative h-80 md:h-auto overflow-hidden">
                        <ImageWithFallback
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-8 flex flex-col justify-center">
                        <Badge className="mb-4 bg-primary text-white w-fit">{post.category}</Badge>
                        <h3 className="text-2xl md:text-3xl mb-4">{post.title}</h3>
                        <p className="text-muted-foreground mb-6">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <Button className="bg-primary hover:bg-primary/90 w-fit">
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-primary' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="overflow-hidden h-full hover:shadow-xl transition-all group cursor-pointer">
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary text-white">{post.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="mb-3 line-clamp-2">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center text-primary text-sm">
                            <span>Read More</span>
                            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Popular Tags */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-colors"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post) => (
                      <div key={post.id} className="flex gap-3 cursor-pointer group">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                            {post.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{post.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="bg-primary text-white">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-white">Subscribe to Our Newsletter</h3>
                  <p className="text-sm text-white/90 mb-4">
                    Get the latest insights delivered to your inbox.
                  </p>
                  <Input
                    placeholder="Your email address"
                    className="mb-3 bg-white text-black"
                  />
                  <Button variant="secondary" className="w-full">
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
