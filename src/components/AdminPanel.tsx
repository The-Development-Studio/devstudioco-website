import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Lock,
  LogIn,
  LayoutDashboard,
  FileText,
  MessageSquare,
  Users,
  Settings,
  MapPin,
  Megaphone,
  Bot,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Briefcase,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { jobsAPI, jobApplicationsAPI } from '../utils/api';

interface AdminPanelProps {
  onNavigate?: (page: string) => void;
}

export function AdminPanel({ onNavigate }: AdminPanelProps = {}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  
  // Jobs state
  const [jobs, setJobs] = useState<any[]>([]);
  const [jobApplications, setJobApplications] = useState<any[]>([]);
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [editingJob, setEditingJob] = useState<any | null>(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    experience: '',
    salary_range: '',
    description: '',
    responsibilities: [] as string[],
    requirements: [] as string[],
    benefits: [] as string[],
    active: true,
  });
  const [responsibilityInput, setResponsibilityInput] = useState('');
  const [requirementInput, setRequirementInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      loadJobs();
      loadApplications();
    }
  }, [isLoggedIn]);

  const loadJobs = async () => {
    try {
      const response = await jobsAPI.getAll();
      setJobs(response.jobs || []);
    } catch (error) {
      console.error('Error loading jobs:', error);
    }
  };

  const loadApplications = async () => {
    try {
      const response = await jobApplicationsAPI.getAll();
      setJobApplications(response.applications || []);
    } catch (error) {
      console.error('Error loading applications:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleOpenJobDialog = (job?: any) => {
    if (job) {
      setEditingJob(job);
      setJobForm({
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        experience: job.experience,
        salary_range: job.salary_range || '',
        description: job.description,
        responsibilities: job.responsibilities || [],
        requirements: job.requirements || [],
        benefits: job.benefits || [],
        active: job.active,
      });
    } else {
      setEditingJob(null);
      setJobForm({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        experience: '',
        salary_range: '',
        description: '',
        responsibilities: [],
        requirements: [],
        benefits: [],
        active: true,
      });
    }
    setShowJobDialog(true);
  };

  const handleSaveJob = async () => {
    try {
      if (editingJob) {
        await jobsAPI.update(editingJob.id, jobForm);
        toast.success('Job updated successfully');
      } else {
        await jobsAPI.create(jobForm);
        toast.success('Job created successfully');
      }
      setShowJobDialog(false);
      loadJobs();
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('Failed to save job');
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (confirm('Are you sure you want to delete this job posting?')) {
      try {
        await jobsAPI.delete(id);
        toast.success('Job deleted successfully');
        loadJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
        toast.error('Failed to delete job');
      }
    }
  };

  const handleUpdateApplicationStatus = async (id: string, status: string) => {
    try {
      await jobApplicationsAPI.updateStatus(id, status);
      toast.success('Application status updated');
      loadApplications();
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update status');
    }
  };

  const dashboardStats = [
    { label: 'Total Blogs', value: '24', icon: FileText, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { label: 'Open Jobs', value: jobs.filter(j => j.active).length.toString(), icon: Briefcase, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
    { label: 'Applications', value: jobApplications.filter(a => a.status === 'new').length.toString(), icon: MessageSquare, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
    { label: 'Form Submissions', value: '45', icon: Users, color: 'text-green-500', bgColor: 'bg-green-500/10' }
  ];

  const blogPosts = [
    { id: 1, title: '10 Web Development Trends to Watch in 2025', status: 'Published', views: '2.5K', date: 'Oct 12, 2025' },
    { id: 2, title: 'Building Secure Mobile Applications', status: 'Published', views: '1.8K', date: 'Oct 10, 2025' },
    { id: 3, title: 'The ROI of Custom Software', status: 'Draft', views: '0', date: 'Oct 8, 2025' }
  ];

  const announcements = [
    { id: 1, title: 'System Maintenance Scheduled', status: 'Active', date: 'Oct 14, 2025' },
    { id: 2, title: 'New Feature Release', status: 'Active', date: 'Oct 10, 2025' },
    { id: 3, title: 'Holiday Hours', status: 'Inactive', date: 'Oct 5, 2025' }
  ];

  const formSubmissions = [
    // Form submissions will be populated from actual database entries
  ];

  const users = [
    { id: 1, name: 'Admin User', email: 'admin@devstudioco.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Editor User', email: 'editor@devstudioco.com', role: 'Editor', status: 'Active' }
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md px-4"
        >
          <Card className="border-2">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Admin Panel Login</CardTitle>
              <p className="text-sm text-muted-foreground">
                Secure access for administrators only
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email Address</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    placeholder="admin@devstudio.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    placeholder="••••••••"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <LogIn className="mr-2 w-4 h-4" />
                  Sign In to Admin Panel
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-secondary/30">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-1">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your website content and settings</p>
            </div>
            <Button variant="outline">
              <Settings className="mr-2 w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, idx) => (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="dashboard">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="clients">
              <Users className="w-4 h-4 mr-2" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="blogs">
              <FileText className="w-4 h-4 mr-2" />
              Blogs
            </TabsTrigger>
            <TabsTrigger value="careers">
              <Briefcase className="w-4 h-4 mr-2" />
              Careers
            </TabsTrigger>
            <TabsTrigger value="announcements">
              <Megaphone className="w-4 h-4 mr-2" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="forms">
              <MessageSquare className="w-4 h-4 mr-2" />
              Forms
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Bot className="w-4 h-4 mr-2" />
              O.R.A.N.G.E AI
            </TabsTrigger>
            <TabsTrigger value="users">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: 'New blog post published', time: '2 hours ago', icon: FileText },
                      { action: 'Contact form submission received', time: '5 hours ago', icon: MessageSquare },
                      { action: 'User role updated', time: '1 day ago', icon: Users },
                      { action: 'Announcement created', time: '2 days ago', icon: Megaphone }
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <activity.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-20 flex-col bg-primary hover:bg-primary/90">
                      <Plus className="w-6 h-6 mb-2" />
                      New Blog Post
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Megaphone className="w-6 h-6 mb-2" />
                      New Announcement
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <MapPin className="w-6 h-6 mb-2" />
                      Edit Map
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Bot className="w-6 h-6 mb-2" />
                      Configure AI
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>Client Portal Management</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage client projects, files, and messages
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                    <h3 className="mb-2">Client Management System</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Use the enhanced Admin Panel (<code>/admin-enhanced</code>) to manage:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Create and update client projects
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Upload files to client portals
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Send messages to clients
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Update project status and progress
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Respond to client messages
                      </li>
                    </ul>
                    <Button 
                      className="mt-6 bg-primary hover:bg-primary/90"
                      onClick={() => onNavigate?.('admin-enhanced')}
                    >
                      Open Enhanced Admin Panel
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-blue-500/5 border-blue-500/20">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                            <FolderKanban className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-2xl mb-1">0</p>
                            <p className="text-sm text-muted-foreground">Client Projects</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-purple-500/5 border-purple-500/20">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-purple-500" />
                          </div>
                          <div>
                            <p className="text-2xl mb-1">0</p>
                            <p className="text-sm text-muted-foreground">Unread Messages</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-500/5 border-green-500/20">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <p className="text-2xl mb-1">0</p>
                            <p className="text-sm text-muted-foreground">Active Clients</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blogs Tab */}
          <TabsContent value="blogs">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Blog Posts</CardTitle>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 w-4 h-4" />
                  New Post
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>
                          <Badge variant={post.status === 'Published' ? 'default' : 'secondary'}>
                            {post.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                            {post.views}
                          </div>
                        </TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Careers Tab */}
          <TabsContent value="careers">
            <div className="space-y-6">
              {/* Job Postings */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Job Postings</CardTitle>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => handleOpenJobDialog()}
                  >
                    <Plus className="mr-2 w-4 h-4" />
                    New Job
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell>{job.title}</TableCell>
                          <TableCell>{job.department}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{job.type}</Badge>
                          </TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>
                            <Badge variant={job.active ? 'default' : 'secondary'}>
                              {job.active ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleOpenJobDialog(job)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleDeleteJob(job.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Job Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobApplications.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell>{app.name}</TableCell>
                          <TableCell>{app.job_title}</TableCell>
                          <TableCell>{app.email}</TableCell>
                          <TableCell>{app.phone}</TableCell>
                          <TableCell>{app.experience}</TableCell>
                          <TableCell>
                            <Select 
                              value={app.status} 
                              onValueChange={(value) => handleUpdateApplicationStatus(app.id, value)}
                            >
                              <SelectTrigger className="w-[130px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="reviewing">Reviewing</SelectItem>
                                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                <SelectItem value="interviewed">Interviewed</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                                <SelectItem value="hired">Hired</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Announcements</CardTitle>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 w-4 h-4" />
                  New Announcement
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {announcements.map((announcement) => (
                      <TableRow key={announcement.id}>
                        <TableCell>{announcement.title}</TableCell>
                        <TableCell>
                          <Badge variant={announcement.status === 'Active' ? 'default' : 'secondary'}>
                            {announcement.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{announcement.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms">
            <Card>
              <CardHeader>
                <CardTitle>Form Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>
                          <Badge variant="outline">{submission.type}</Badge>
                        </TableCell>
                        <TableCell>{submission.name}</TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{submission.date}</TableCell>
                        <TableCell>
                          <Badge variant={submission.status === 'New' ? 'default' : 'secondary'}>
                            {submission.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* O.R.A.N.G.E AI Tab */}
          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>O.R.A.N.G.E AI Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable AI Assistant</Label>
                      <p className="text-sm text-muted-foreground">Show chatbot on all pages</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-respond</Label>
                      <p className="text-sm text-muted-foreground">Automatically respond to common queries</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show on Mobile</Label>
                      <p className="text-sm text-muted-foreground">Display chatbot on mobile devices</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Welcome Message</Label>
                  <Textarea
                    placeholder="Hello! I'm O.R.A.N.G.E, your AI assistant..."
                    defaultValue="Hello! I'm O.R.A.N.G.E, your AI assistant. How can I help you today?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Quick Actions</Label>
                  <Input placeholder="View Services, Get Quote, etc." />
                </div>

                <Button className="bg-primary hover:bg-primary/90">
                  Save AI Configuration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>User Management</CardTitle>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 w-4 h-4" />
                  Add User
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">{user.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Job Dialog */}
      <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingJob ? 'Edit Job' : 'Create New Job'}</DialogTitle>
            <DialogDescription>
              Fill in the details for the job posting
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Title *</Label>
                <Input
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  placeholder="Senior Software Engineer"
                />
              </div>

              <div className="space-y-2">
                <Label>Department *</Label>
                <Input
                  value={jobForm.department}
                  onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                  placeholder="Engineering"
                />
              </div>

              <div className="space-y-2">
                <Label>Location *</Label>
                <Input
                  value={jobForm.location}
                  onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                  placeholder="Chennai, India"
                />
              </div>

              <div className="space-y-2">
                <Label>Job Type *</Label>
                <Select 
                  value={jobForm.type} 
                  onValueChange={(value) => setJobForm({ ...jobForm, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Experience Required *</Label>
                <Input
                  value={jobForm.experience}
                  onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                  placeholder="3-5 years"
                />
              </div>

              <div className="space-y-2">
                <Label>Salary Range</Label>
                <Input
                  value={jobForm.salary_range}
                  onChange={(e) => setJobForm({ ...jobForm, salary_range: e.target.value })}
                  placeholder="₹8-12 LPA"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Job Description *</Label>
              <Textarea
                value={jobForm.description}
                onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                placeholder="Describe the role and what you're looking for..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Responsibilities</Label>
              <div className="flex gap-2">
                <Input
                  value={responsibilityInput}
                  onChange={(e) => setResponsibilityInput(e.target.value)}
                  placeholder="Add a responsibility"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (responsibilityInput.trim()) {
                        setJobForm({
                          ...jobForm,
                          responsibilities: [...jobForm.responsibilities, responsibilityInput.trim()]
                        });
                        setResponsibilityInput('');
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (responsibilityInput.trim()) {
                      setJobForm({
                        ...jobForm,
                        responsibilities: [...jobForm.responsibilities, responsibilityInput.trim()]
                      });
                      setResponsibilityInput('');
                    }
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {jobForm.responsibilities.map((item, idx) => (
                  <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                    {item}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => {
                        setJobForm({
                          ...jobForm,
                          responsibilities: jobForm.responsibilities.filter((_, i) => i !== idx)
                        });
                      }}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Requirements</Label>
              <div className="flex gap-2">
                <Input
                  value={requirementInput}
                  onChange={(e) => setRequirementInput(e.target.value)}
                  placeholder="Add a requirement"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (requirementInput.trim()) {
                        setJobForm({
                          ...jobForm,
                          requirements: [...jobForm.requirements, requirementInput.trim()]
                        });
                        setRequirementInput('');
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (requirementInput.trim()) {
                      setJobForm({
                        ...jobForm,
                        requirements: [...jobForm.requirements, requirementInput.trim()]
                      });
                      setRequirementInput('');
                    }
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {jobForm.requirements.map((item, idx) => (
                  <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                    {item}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => {
                        setJobForm({
                          ...jobForm,
                          requirements: jobForm.requirements.filter((_, i) => i !== idx)
                        });
                      }}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Benefits</Label>
              <div className="flex gap-2">
                <Input
                  value={benefitInput}
                  onChange={(e) => setBenefitInput(e.target.value)}
                  placeholder="Add a benefit"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (benefitInput.trim()) {
                        setJobForm({
                          ...jobForm,
                          benefits: [...jobForm.benefits, benefitInput.trim()]
                        });
                        setBenefitInput('');
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (benefitInput.trim()) {
                      setJobForm({
                        ...jobForm,
                        benefits: [...jobForm.benefits, benefitInput.trim()]
                      });
                      setBenefitInput('');
                    }
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {jobForm.benefits.map((item, idx) => (
                  <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                    {item}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => {
                        setJobForm({
                          ...jobForm,
                          benefits: jobForm.benefits.filter((_, i) => i !== idx)
                        });
                      }}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={jobForm.active}
                onCheckedChange={(checked) => setJobForm({ ...jobForm, active: checked })}
              />
              <Label>Active (visible to applicants)</Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleSaveJob}
                className="bg-primary hover:bg-primary/90"
              >
                {editingJob ? 'Update Job' : 'Create Job'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowJobDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
