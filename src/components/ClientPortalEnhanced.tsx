import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Lock, 
  LogIn,
  LogOut,
  FolderKanban,
  FileText,
  MessageSquare,
  Bell,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Send,
  Loader2
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function ClientPortalEnhanced() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentClient, setCurrentClient] = useState<any>(null);
  
  // Data states
  const [projects, setProjects] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    // Check if client is authenticated
    const token = localStorage.getItem('clientAccessToken');
    const client = localStorage.getItem('currentClient');
    if (token && client) {
      setAccessToken(token);
      setCurrentClient(JSON.parse(client));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && accessToken) {
      loadClientData();
    }
  }, [isLoggedIn, accessToken]);

  const loadClientData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadProjects(),
        loadFiles(),
        loadMessages()
      ]);
    } catch (error) {
      console.error('Error loading client data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b9482a76/api/client/projects`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const loadFiles = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b9482a76/api/client/files`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await response.json();
      setFiles(data.files || []);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  };

  const loadMessages = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b9482a76/api/client/messages`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b9482a76/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginForm)
        }
      );

      const data = await response.json();

      if (data.success && data.accessToken) {
        localStorage.setItem('clientAccessToken', data.accessToken);
        localStorage.setItem('currentClient', JSON.stringify({ 
          email: loginForm.email,
          fullName: 'Client' 
        }));
        setAccessToken(data.accessToken);
        setCurrentClient({ email: loginForm.email, fullName: 'Client' });
        setIsLoggedIn(true);
        toast.success('Login successful! An OTP has been sent to your email.');
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('clientAccessToken');
    localStorage.removeItem('currentClient');
    setIsLoggedIn(false);
    setAccessToken(null);
    setCurrentClient(null);
    setProjects([]);
    setFiles([]);
    setMessages([]);
    toast.success('Logged out successfully');
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedProjectId) {
      toast.error('Please select a project and write a message');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b9482a76/api/client/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: newMessage,
            project_id: selectedProjectId
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success('Message sent successfully');
        setNewMessage('');
        loadMessages();
      } else {
        toast.error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-primary';
      case 'on_hold': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

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
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 w-4 h-4" />
                      Sign In
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <a href="/contact" className="text-primary hover:underline">
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

  const activeProjects = projects.filter(p => p.status !== 'completed').length;
  const unreadMessages = messages.filter(m => !m.read && m.sender === 'admin').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;

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
                {unreadMessages > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                )}
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
                  <p className="text-2xl">{activeProjects}</p>
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
                  <p className="text-sm text-muted-foreground mb-1">Total Files</p>
                  <p className="text-2xl">{files.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Unread Messages</p>
                  <p className="text-2xl">{unreadMessages}</p>
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
                  <p className="text-2xl">{completedProjects}</p>
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
              {unreadMessages > 0 && (
                <Badge className="ml-2 bg-primary">{unreadMessages}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects">
            {projects.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FolderKanban className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="mb-2">No Projects Yet</h3>
                  <p className="text-muted-foreground">Your projects will appear here once they're created by our team.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="mb-1">{project.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-primary">
                              {project.phase}
                            </Badge>
                            {project.due_date && (
                              <span className="text-sm text-muted-foreground">
                                Due: {new Date(project.due_date).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status?.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span>{project.progress || 0}%</span>
                        </div>
                        <Progress value={project.progress || 0} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files">
            {files.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="mb-2">No Files Yet</h3>
                  <p className="text-muted-foreground">Project files will appear here when uploaded by our team.</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p>{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {file.file_size} • {new Date(file.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" asChild>
                          <a href={file.file_url} target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {messages.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No messages yet</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-4 border border-border rounded-lg ${
                            message.sender === 'admin' 
                              ? 'bg-primary/5 border-primary/20' 
                              : 'bg-muted/50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">
                                {message.sender === 'admin' ? 'The Development Studio' : 'You'}
                              </p>
                              {message.sender === 'admin' && !message.read && (
                                <Badge className="bg-primary text-xs">New</Badge>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(message.created_at).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Send Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Project</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md bg-background"
                      value={selectedProjectId || ''}
                      onChange={(e) => setSelectedProjectId(e.target.value)}
                    >
                      <option value="">Select a project...</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea
                      placeholder="Type your message here..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      rows={6}
                      disabled={loading}
                    />
                  </div>

                  <Button 
                    onClick={handleSendMessage} 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={loading || !selectedProjectId || !newMessage.trim()}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
