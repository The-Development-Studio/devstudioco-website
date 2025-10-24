import { motion } from 'motion/react';
import { Award, Users, Trophy, Target, CheckCircle2, Building2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { TeamSection } from './TeamSection';
import { HeroMinimal } from './HeroMinimal';
import { CompanyTimeline } from './CompanyTimeline';
import { useCountAnimation, parseStatValue } from '../utils/useCountAnimation';

const stats = [
  { label: 'Projects Completed', value: '50+' },
  { label: 'Happy Clients', value: '30+' },
  { label: 'Years of Excellence', value: '05+' },
  { label: 'Team Members', value: '20+' }
];

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in every project, delivering solutions that exceed expectations.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work closely with our clients, treating their success as our own.'
  },
  {
    icon: Trophy,
    title: 'Innovation',
    description: 'We embrace cutting-edge technologies to deliver innovative solutions.'
  },
  {
    icon: Target,
    title: 'Integrity',
    description: 'We maintain the highest standards of professionalism and transparency.'
  }
];

const skills = [
  { name: 'Web Development', percentage: 95 },
  { name: 'Mobile Development', percentage: 90 },
  { name: 'UI/UX Design', percentage: 92 },
  { name: 'Cloud Solutions', percentage: 88 },
  { name: 'Cyber Security', percentage: 85 },
  { name: 'DevOps', percentage: 87 }
];

const team = [
  { name: 'Magheswari N', role: 'CEO & Founder', expertise: 'Business Strategy' },
  { name: 'Somaskandhan M', role: 'Co-Managing Director', expertise: 'Business Strategy & Software Architecture' },
  { name: 'Raghul', role: 'Managing Partner', expertise: 'Management & Cyber Security' },
  { name: 'Sarah Wilson', role: 'Head of Development', expertise: 'Full Stack Development' }
];

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const { number, suffix } = parseStatValue(value);
  const { count, ref } = useCountAnimation({ end: number, duration: 2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl text-primary mb-2">
        {count}{suffix}
      </div>
      <div className="text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <HeroMinimal
        icon={Building2}
        title="Transforming Ideas Into Digital Excellence"
        subtitle="About The Development Studio"
        description="For over a decade, The Development Studio has been at the forefront of digital innovation, helping businesses worldwide achieve their goals through cutting-edge technology solutions."
        variant="gradient"
      />

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <AnimatedStat
                key={idx}
                value={stat.value}
                label={stat.label}
                delay={idx * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl mb-6">Our Story</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-lg text-muted-foreground"
            >
              <p>
                Founded in 2020, The Development Studio began with a simple mission: to bridge the gap between business needs and technology solutions. What started as a small team of passionate developers has grown into a Government-recognized, ISO-certified company serving clients across the globe.
              </p>
              <p>
                Our journey has been marked by remarkable milestones—from delivering 50+ successful projects and corporate branding solutions, to achieving Government recognition in 2023, and securing ISO certification in 2024. We've evolved from building simple websites to creating complex enterprise solutions, mobile applications, and comprehensive digital ecosystems.
              </p>
              <p>
                Today, we're proud to be a globally recognized company, offering our services to clients worldwide. Our team of 20+ professionals brings together diverse expertise in software development, design, security, and business strategy, all working towards one goal: crafting dreams into designs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 p-8 bg-primary/10 rounded-2xl border-l-4 border-primary"
            >
              <p className="text-xl italic">
                "Crafting Dreams into Designs: Your Vision, Our Artistry"
              </p>
              <p className="mt-2 text-muted-foreground">
                This isn't just our tagline—it's our promise. We believe that every business has a unique story to tell, and we're here to help you tell it through exceptional digital experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all hover:border-primary">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Our Expertise</h2>
            <p className="text-xl text-muted-foreground">
              Mastering the technologies that power modern businesses
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span>{skill.name}</span>
                    <span className="text-primary">{skill.percentage}%</span>
                  </div>
                  <Progress value={skill.percentage} className="h-2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-muted-foreground">
              The visionaries driving our success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="mb-1">{member.name}</h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.expertise}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Partners */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl mb-4">Certifications & Partners</h2>
              <p className="text-xl text-muted-foreground">
                Committed to quality and excellence through recognized standards
              </p>
            </div>

            {/* ISO Certifications */}
            <div className="mb-12">
              <h3 className="text-center mb-8 text-muted-foreground">ISO Certified Standards</h3>
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
                {/* ISO 9001:2015 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-primary/10 rounded-full flex items-center justify-center mb-3 border-2 border-primary/20 hover:border-primary transition-colors">
                    <div className="text-center">
                      <Award className="w-8 h-8 text-primary mx-auto mb-1" />
                      <div className="text-xs text-primary font-bold">ISO</div>
                      <div className="text-sm text-primary font-bold">9001:2015</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Quality<br/>Management</p>
                </motion.div>

                {/* ISO 27001 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-primary/10 rounded-full flex items-center justify-center mb-3 border-2 border-primary/20 hover:border-primary transition-colors">
                    <div className="text-center">
                      <Award className="w-8 h-8 text-primary mx-auto mb-1" />
                      <div className="text-xs text-primary font-bold">ISO</div>
                      <div className="text-sm text-primary font-bold">27001</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Information<br/>Security</p>
                </motion.div>

                {/* ISO 20000-1 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-primary/10 rounded-full flex items-center justify-center mb-3 border-2 border-primary/20 hover:border-primary transition-colors">
                    <div className="text-center">
                      <Award className="w-8 h-8 text-primary mx-auto mb-1" />
                      <div className="text-xs text-primary font-bold">ISO</div>
                      <div className="text-sm text-primary font-bold">20000-1</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">IT Service<br/>Management</p>
                </motion.div>

                {/* Dun & Bradstreet */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-secondary rounded-full flex items-center justify-center mb-3 border-2 border-border hover:border-primary transition-colors">
                    <div className="text-center px-2">
                      <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-1" />
                      <div className="text-xs font-bold">D&B</div>
                      <div className="text-xs">Verified</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Dun &<br/>Bradstreet</p>
                </motion.div>
              </div>
            </div>

            {/* Technology Partners */}
            <div className="pt-12 border-t border-border">
              <h3 className="text-center mb-8 text-muted-foreground">Technology Partners</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {/* Google Cloud Platform */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center p-6 bg-secondary rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">GCP</div>
                    <div className="text-xs text-muted-foreground">Google Cloud</div>
                  </div>
                </motion.div>

                {/* Microsoft Azure */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center justify-center p-6 bg-secondary rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">Azure</div>
                    <div className="text-xs text-muted-foreground">Microsoft</div>
                  </div>
                </motion.div>

                {/* Amazon Web Services */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center p-6 bg-secondary rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">AWS</div>
                    <div className="text-xs text-muted-foreground">Amazon</div>
                  </div>
                </motion.div>

                {/* DesignRush */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center p-6 bg-secondary rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">DR</div>
                    <div className="text-xs text-muted-foreground">DesignRush</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Commitment Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 p-8 bg-primary/5 rounded-2xl border border-primary/20"
            >
              <p className="text-center text-muted-foreground max-w-3xl mx-auto">
                Our certifications and partnerships reflect our unwavering commitment to quality, security, and innovation. We continuously invest in maintaining the highest industry standards to deliver exceptional value to our clients.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Timeline / Milestones */}
      <CompanyTimeline />

      {/* Team Section */}
      <TeamSection />
    </div>
  );
}
