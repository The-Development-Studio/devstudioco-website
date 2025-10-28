import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Briefcase, MapPin, Clock, DollarSign, Users, Send, X, Calendar, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { translations } from '../utils/i18n';
import { getJobs, submitJobApplication } from '../utils/api';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time, Part-time, Contract, Internship
  experience: string;
  salary_range?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  posted_date: string;
  active: boolean;
}

export default function CareersPage() {
  // Default to English
  const t = translations['en'];

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');

  // Application form state
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    linkedIn: '',
    portfolio: '',
    coverLetter: '',
    resume: null as File | null,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
      toast.error('Failed to load job postings');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const typeMatch = filterType === 'all' || job.type === filterType;
    const departmentMatch = filterDepartment === 'all' || job.department === filterDepartment;
    return typeMatch && departmentMatch;
  });

  const departments = Array.from(new Set(jobs.map((job) => job.department)));
  const jobTypes = Array.from(new Set(jobs.map((job) => job.type)));

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedJob) return;

    try {
      setSubmitting(true);
      
      // In production, you would upload the resume file to storage
      // For now, we'll submit the application without file upload
      await submitJobApplication({
        job_id: selectedJob.id,
        job_title: selectedJob.title,
        name: applicationForm.name,
        email: applicationForm.email,
        phone: applicationForm.phone,
        location: applicationForm.location,
        experience: applicationForm.experience,
        linkedin_url: applicationForm.linkedIn,
        portfolio_url: applicationForm.portfolio,
        cover_letter: applicationForm.coverLetter,
        resume_url: '', // Would be file URL after upload
      });

      toast.success('Application submitted successfully!');
      setShowApplicationModal(false);
      setApplicationForm({
        name: '',
        email: '',
        phone: '',
        location: '',
        experience: '',
        linkedIn: '',
        portfolio: '',
        coverLetter: '',
        resume: null,
      });
      setSelectedJob(null);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl mb-6">Join Our Team</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
              Be part of an innovative team building the future of digital solutions
            </p>
            <p className="text-[#FF6600] text-lg">
              Crafting Dreams into Designs: Your Vision, Our Artistry
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Briefcase, label: 'Open Positions', value: jobs.filter(j => j.active).length },
              { icon: Users, label: 'Team Members', value: '10+' },
              { icon: MapPin, label: 'Locations', value: '2+' },
              { icon: Calendar, label: 'Founded', value: '2020' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 text-[#FF6600] mx-auto mb-4" />
                <div className="text-3xl mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">Why Join The Development Studio?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer more than just a job – we provide a platform for growth, innovation, and impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Growth & Learning',
                description: 'Continuous learning opportunities with latest technologies and industry best practices',
              },
              {
                title: 'Work-Life Balance',
                description: 'Flexible working hours, remote options, and a supportive work environment',
              },
              {
                title: 'Competitive Benefits',
                description: 'Attractive salary packages, health insurance, and performance bonuses',
              },
              {
                title: 'Innovation Culture',
                description: 'Work on cutting-edge projects and contribute your innovative ideas',
              },
              {
                title: 'Team Collaboration',
                description: 'Collaborate with talented professionals in a diverse and inclusive environment',
              },
              {
                title: 'Career Advancement',
                description: 'Clear career paths with opportunities for promotion and leadership roles',
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-[#FF6600]">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">
              Find your dream job and start your journey with us
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job Listings */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#FF6600] border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading positions...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <Card className="p-12 text-center">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl mb-2">No Openings Currently</h3>
              <p className="text-gray-600">
                We don't have any open positions matching your criteria at the moment.
                Check back soon or send us your resume at{' '}
                <a href="mailto:info@devstudioco.com" className="text-[#FF6600] hover:underline">
                  info@devstudioco.com
                </a>
              </p>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                          <CardDescription className="text-base">
                            {job.department}
                          </CardDescription>
                        </div>
                        <Badge className="bg-[#FF6600] hover:bg-[#FF6600]/90">
                          {job.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {job.experience}
                        </div>
                        {job.salary_range && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            {job.salary_range}
                          </div>
                        )}
                      </div>

                      <p className="text-gray-700 mb-6 line-clamp-3">{job.description}</p>

                      <div className="flex gap-4">
                        <Button
                          onClick={() => handleApplyClick(job)}
                          className="bg-[#FF6600] hover:bg-[#FF6600]/90"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Apply Now
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedJob(job)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Job Details Modal */}
      <Dialog open={!!selectedJob && !showApplicationModal} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedJob.department} • {selectedJob.location} • {selectedJob.type}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="text-lg mb-2">About the Role</h3>
                  <p className="text-gray-700">{selectedJob.description}</p>
                </div>

                {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                  <div>
                    <h3 className="text-lg mb-2">Responsibilities</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {selectedJob.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                  <div>
                    <h3 className="text-lg mb-2">Requirements</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                  <div>
                    <h3 className="text-lg mb-2">Benefits</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {selectedJob.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={() => {
                      setShowApplicationModal(true);
                    }}
                    className="bg-[#FF6600] hover:bg-[#FF6600]/90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Apply for this Position
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedJob(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Application Modal */}
      <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              Fill out the form below to submit your application
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleApplicationSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={applicationForm.name}
                  onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={applicationForm.email}
                  onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={applicationForm.phone}
                  onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>

              <div>
                <Label htmlFor="location">Current Location *</Label>
                <Input
                  id="location"
                  required
                  value={applicationForm.location}
                  onChange={(e) => setApplicationForm({ ...applicationForm, location: e.target.value })}
                  placeholder="Chennai, India"
                />
              </div>

              <div>
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  required
                  value={applicationForm.experience}
                  onChange={(e) => setApplicationForm({ ...applicationForm, experience: e.target.value })}
                  placeholder="3-5 years"
                />
              </div>

              <div>
                <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                <Input
                  id="linkedIn"
                  value={applicationForm.linkedIn}
                  onChange={(e) => setApplicationForm({ ...applicationForm, linkedIn: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="portfolio">Portfolio/Website</Label>
              <Input
                id="portfolio"
                value={applicationForm.portfolio}
                onChange={(e) => setApplicationForm({ ...applicationForm, portfolio: e.target.value })}
                placeholder="https://yourportfolio.com"
              />
            </div>

            <div>
              <Label htmlFor="coverLetter">Cover Letter *</Label>
              <Textarea
                id="coverLetter"
                required
                rows={6}
                value={applicationForm.coverLetter}
                onChange={(e) => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                placeholder="Tell us why you're a great fit for this role..."
              />
            </div>

            <div>
              <Label htmlFor="resume">Resume/CV *</Label>
              <Input
                id="resume"
                type="file"
                required
                accept=".pdf,.doc,.docx"
                onChange={(e) => setApplicationForm({ ...applicationForm, resume: e.target.files?.[0] || null })}
              />
              <p className="text-sm text-gray-500 mt-1">
                Accepted formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-[#FF6600] hover:bg-[#FF6600]/90"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowApplicationModal(false);
                  setApplicationForm({
                    name: '',
                    email: '',
                    phone: '',
                    location: '',
                    experience: '',
                    linkedIn: '',
                    portfolio: '',
                    coverLetter: '',
                    resume: null,
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-6">Don't See the Right Position?</h2>
            <p className="text-xl text-gray-300 mb-8">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <a href="mailto:info@devstudioco.com?subject=General Application">
              <Button className="bg-[#FF6600] hover:bg-[#FF6600]/90 text-lg px-8 py-6">
                Send Your Resume
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
