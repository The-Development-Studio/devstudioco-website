import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Lock, 
  User, 
  LogIn,
  LogOut,
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner@2.0.3';

export function ClientPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [currentClient, setCurrentClient] = useState<any>(null);

  useEffect(() => {
    // Check if client is authenticated
    const client = localStorage.getItem('currentClient');
    if (client) {
      setCurrentClient(JSON.parse(client));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentClient');
    setIsLoggedIn(false);
    setCurrentClient(null);
    toast.success('Logged out successfully');
    window.location.reload(); // Refresh to show auth screen
  };

  const projects = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      status: 'In Progress',
      progress: 65,
      dueDate: 'Nov 15, 2025',
      phase: 'Development',
      color: 'text-blue-500'
    },
    {
      id: 2,
      name: 'Mobile App Redesign',
      status: 'In Progress',
      progress: 40,
      dueDate: 'Dec 01, 2025',
      phase: 'Design',
      color: 'text-purple-500'
    },
    {
      id: 3,
      name: 'Website Maintenance',
      status: 'Completed',
      progress: 100,
      dueDate: 'Oct 10, 2025',
      phase: 'Deployed',
      color: 'text-green-500'
    }
  ];

  const files = [
    { name: 'Project_Proposal_v2.pdf', size: '2.4 MB', date: 'Oct 12, 2025' },
    { name: 'Design_Mockups.fig', size: '15.8 MB', date: 'Oct 10, 2025' },
    { name: 'Technical_Specs.docx', size: '1.2 MB', date: 'Oct 08, 2025' },
    { name: 'Brand_Guidelines.pdf', size: '8.5 MB', date: 'Oct 05, 2025' }
  ];

  const messages = [
    {
      from: 'Project Manager',
      subject: 'Weekly Progress Update',
      preview: 'Here\'s the latest update on your project...',
      date: 'Oct 12',
      unread: true
    },
    {
      from: 'Support Team',
      subject: 'Your ticket has been resolved',
      preview: 'We\'ve successfully resolved your support ticket...',
      date: 'Oct 10',
      unread: false
    },
    {
      from: 'Design Team',
      subject: 'New mockups ready for review',
      preview: 'Please review the latest design iterations...',
      date: 'Oct 08',
      unread: false
    }
  ];

  const notifications = [
    { message: 'Project milestone completed', time: '2 hours ago', type: 'success' },
    { message: 'New file uploaded to your project', time: '5 hours ago', type: 'info' },
    { message: 'Invoice #1234 is due in 3 days', time: '1 day ago', type: 'warning' },
    { message: 'Meeting scheduled for tomorrow at 2 PM', time: '2 days ago', type: 'info' }
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
              <CardTitle className="text-2xl">Client Portal Login</CardTitle>
              <p className="text-sm text-muted-foreground">
                Access your projects, files, and communications
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <LogIn className="mr-2 w-4 h-4" />
                  Sign In
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <a href="#" className="text-primary hover:underline">
                    Contact us
                  </a>
                </p>
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
              <h1 className="text-3xl mb-1">Welcome back, {currentClient?.fullName || 'Client'}!</h1>
              <p className="text-muted-foreground">Here's what's happening with your projects</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </Button>
              <Avatar>
                <AvatarFallback className="bg-primary text-white">
                  {currentClient?.fullName?.split(' ').map((n: string) => n[0]).join('') || 'CL'}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Projects</p>
                  <p className="text-2xl">2</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <FolderKanban className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending Tasks</p>
                  <p className="text-2xl">8</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Unread Messages</p>
                  <p className="text-2xl">1</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Completed</p>
                  <p className="text-2xl">12</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList>
            <TabsTrigger value="projects">
              <FolderKanban className="w-4 h-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="files">
              <FileText className="w-4 h-4 mr-2" />
              Files
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="space-y-4">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="mb-1">{project.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={project.color}>
                            {project.phase}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Due: {project.dueDate}
                          </span>
                        </div>
                      </div>
                      <Badge
                        className={
                          project.status === 'Completed'
                            ? 'bg-green-500'
                            : 'bg-primary'
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Download Files
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p>{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {file.size} • {file.date}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {messages.map((message, idx) => (
                    <div
                      key={idx}
                      className={`p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer ${
                        message.unread ? 'bg-primary/5 border-primary/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <p>{message.from}</p>
                          {message.unread && (
                            <Badge className="bg-primary text-xs">New</Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{message.date}</span>
                      </div>
                      <h4 className="mb-1">{message.subject}</h4>
                      <p className="text-sm text-muted-foreground">{message.preview}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {notifications.map((notification, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 border border-border rounded-lg"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        notification.type === 'success' ? 'bg-green-500/10' :
                        notification.type === 'warning' ? 'bg-yellow-500/10' :
                        'bg-blue-500/10'
                      }`}>
                        {notification.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : notification.type === 'warning' ? (
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                        ) : (
                          <Bell className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p>{notification.message}</p>
                        <p className="text-sm text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
