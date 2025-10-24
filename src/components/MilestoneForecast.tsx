import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Globe, 
  Users, 
  Award,
  Rocket,
  Building2,
  Zap,
  Target,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const milestones = [
  {
    year: '2025',
    title: 'Global Expansion',
    icon: Globe,
    status: 'current',
    achievements: [
      'Launch operations in 3 new countries',
      'Expand team to 100+ members',
      'Achieve ₹50 Crore revenue'
    ]
  },
  {
    year: '2026',
    title: 'AI Integration',
    icon: Zap,
    status: 'planned',
    achievements: [
      'Launch AI-powered development tools',
      'Implement advanced automation',
      'Reach 1000+ active clients'
    ]
  },
  {
    year: '2027',
    title: 'Innovation Hub',
    icon: Rocket,
    status: 'planned',
    achievements: [
      'Open R&D centers in 5 cities',
      'Launch proprietary SaaS products',
      'Achieve ₹100 Crore revenue'
    ]
  },
  {
    year: '2028',
    title: 'Market Leadership',
    icon: Award,
    status: 'planned',
    achievements: [
      'Top 10 IT company in India',
      'Expand to Fortune 500 clients',
      'Team of 250+ professionals'
    ]
  },
  {
    year: '2029',
    title: 'Strategic Partnerships',
    icon: Building2,
    status: 'planned',
    achievements: [
      'Partner with global tech giants',
      'Acquire 2 complementary businesses',
      'IPO preparation phase'
    ]
  },
  {
    year: '2030',
    title: 'Industry Pioneer',
    icon: Target,
    status: 'planned',
    achievements: [
      'Launch IPO successfully',
      'Achieve ₹500 Crore revenue',
      'Recognized as innovation leader'
    ]
  },
  {
    year: '2031',
    title: 'Global Recognition',
    icon: Users,
    status: 'planned',
    achievements: [
      'Operations in 20+ countries',
      'Team of 500+ experts',
      'Multiple proprietary products'
    ]
  },
  {
    year: '2035',
    title: 'Technology Excellence',
    icon: TrendingUp,
    status: 'vision',
    achievements: [
      'Leading AI & ML solutions provider',
      '₹1000 Crore+ revenue milestone',
      'Impact 1M+ businesses worldwide'
    ]
  }
];

export function MilestoneForecast() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4">10-Year Vision</Badge>
          <h2 className="text-4xl md:text-5xl mb-4">Our Growth Roadmap</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Strategic milestones and ambitious goals that drive our journey to becoming a global technology leader
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 transform -translate-x-1/2" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`lg:grid lg:grid-cols-2 lg:gap-8 ${
                  index % 2 === 0 ? '' : 'lg:grid-flow-dense'
                }`}
              >
                {/* Card */}
                <Card 
                  className={`relative hover:shadow-xl transition-all ${
                    milestone.status === 'current' 
                      ? 'border-2 border-primary shadow-lg' 
                      : 'hover:border-primary'
                  } ${index % 2 === 0 ? '' : 'lg:col-start-2'}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        milestone.status === 'current' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        <milestone.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl text-primary">{milestone.year}</span>
                          {milestone.status === 'current' && (
                            <Badge variant="default">In Progress</Badge>
                          )}
                          {milestone.status === 'vision' && (
                            <Badge variant="outline">Vision</Badge>
                          )}
                        </div>
                        <h3 className="mb-3">{milestone.title}</h3>
                        <ul className="space-y-2">
                          {milestone.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline Dot */}
                <div className={`hidden lg:flex items-center justify-center ${
                  index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'
                }`}>
                  <div className={`w-4 h-4 rounded-full ${
                    milestone.status === 'current' 
                      ? 'bg-primary ring-4 ring-primary/20' 
                      : 'bg-primary/50'
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
