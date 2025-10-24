import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { teamAPI } from '../utils/api';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio?: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
}

// Default team members - fallback if database is empty
const defaultTeamMembers: TeamMember[] = [];

export function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(defaultTeamMembers);

  useEffect(() => {
    // Load team members from Supabase
    teamAPI.getAll()
      .then(data => {
        if (data.team && data.team.length > 0) {
          setTeamMembers(data.team);
        }
      })
      .catch(e => {
        // Silently fail - database setup alert will handle this
        // Will use defaultTeamMembers (empty array) as fallback
      });
  }, []);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate professionals dedicated to delivering exceptional results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 relative">
                    <Avatar className="w-32 h-32 mx-auto border-4 border-primary/20 group-hover:border-primary/50 transition-all">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="bg-primary text-white text-2xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300 -z-10" />
                  </div>

                  <h3 className="text-xl mb-1">{member.name}</h3>
                  <p className="text-primary mb-3">{member.role}</p>
                  
                  {member.bio && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {member.bio}
                    </p>
                  )}

                  <div className="flex justify-center gap-2">
                    {member.social.linkedin && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-primary hover:text-white transition-colors"
                        asChild
                      >
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {member.social.twitter && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-primary hover:text-white transition-colors"
                        asChild
                      >
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {member.social.github && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-primary hover:text-white transition-colors"
                        asChild
                      >
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {member.social.email && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-primary hover:text-white transition-colors"
                        asChild
                      >
                        <a href={`mailto:${member.social.email}`}>
                          <Mail className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
