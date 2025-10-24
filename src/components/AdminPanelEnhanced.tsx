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
  Megaphone,
  Bot,
  Eye,
  Edit,
  Trash2,
  Plus,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  Quote,
  Mail
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { toast } from 'sonner@2.0.3';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const ADMIN_EMAIL = 'info@devstudioco.com';
const ADMIN_PASSWORD = '12345';

interface Client {
  id: number;
  fullName: string;
  companyName: string;
  email: string;
  password: string;
  verified: boolean;
  registeredAt: string;
}

interface Testimonial {
  id: number;
  name: string;
  designation: string;
  company: string;
  quote: string;
  image: string;
}

interface ClientLogo {
  id: number;
  name: string;
  imageUrl: string;
  order: number;
}

export function AdminPanelEnhanced() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [clients, setClients] = useState<Client[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  
  // Form states for adding/editing
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    designation: '',
    company: '',
    quote: '',
    image: ''
  });
  
  const [newLogo, setNewLogo] = useState({
    name: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);

  const loadData = () => {
    // Load registered clients
    const storedClients = localStorage.getItem('registeredClients');
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }

    // Load testimonials
    const storedTestimonials = localStorage.getItem('testimonials');
    if (storedTestimonials) {
      setTestimonials(JSON.parse(storedTestimonials));
    }

    // Load client logos
    const storedLogos = localStorage.getItem('clientLogos');
    if (storedLogos) {
      const parsed = JSON.parse(storedLogos);
      setClientLogos(parsed.sort((a: ClientLogo, b: ClientLogo) => a.order - b.order));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginForm.email === ADMIN_EMAIL && loginForm.password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      toast.success('Welcome to Admin Panel');
    } else {
      toast.error('Invalid admin credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: '', password: '' });
    toast.success('Logged out successfully');
  };

  // Testimonial Management
  const handleAddTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.company || !newTestimonial.quote) {
      toast.error('Please fill in all required fields');
      return;
    }

    const testimonial: Testimonial = {
      id: Date.now(),
      ...newTestimonial,
      image: newTestimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(newTestimonial.name)}&size=150`
    };

    const updated = [...testimonials, testimonial];
    setTestimonials(updated);
    localStorage.setItem('testimonials', JSON.stringify(updated));
    
    setNewTestimonial({ name: '', designation: '', company: '', quote: '', image: '' });
    toast.success('Testimonial added successfully');
  };

  const handleDeleteTestimonial = (id: number) => {
    const updated = testimonials.filter(t => t.id !== id);
    setTestimonials(updated);
    localStorage.setItem('testimonials', JSON.stringify(updated));
    toast.success('Testimonial deleted');
  };

  const handleUpdateTestimonial = () => {
    if (!editingTestimonial) return;

    const updated = testimonials.map(t => 
      t.id === editingTestimonial.id ? editingTestimonial : t
    );
    setTestimonials(updated);
    localStorage.setItem('testimonials', JSON.stringify(updated));
    setEditingTestimonial(null);
    toast.success('Testimonial updated');
  };

  // Logo Management
  const handleAddLogo = () => {
    if (!newLogo.name) {
      toast.error('Please enter a company name');
      return;
    }

    const logo: ClientLogo = {
      id: Date.now(),
      name: newLogo.name,
      imageUrl: newLogo.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(newLogo.name)}&size=200`,
      order: clientLogos.length + 1
    };

    const updated = [...clientLogos, logo];
    setClientLogos(updated);
    localStorage.setItem('clientLogos', JSON.stringify(updated));
    
    setNewLogo({ name: '', imageUrl: '' });
    toast.success('Logo added successfully');
  };

  const handleDeleteLogo = (id: number) => {
    const updated = clientLogos.filter(l => l.id !== id).map((l, idx) => ({
      ...l,
      order: idx + 1
    }));
    setClientLogos(updated);
    localStorage.setItem('clientLogos', JSON.stringify(updated));
    toast.success('Logo deleted');
  };

  const handleReorderLogo = (id: number, direction: 'up' | 'down') => {
    const index = clientLogos.findIndex(l => l.id === id);
    if (index === -1) return;
    
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === clientLogos.length - 1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...clientLogos];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    
    const updated = reordered.map((l, idx) => ({ ...l, order: idx + 1 }));
    setClientLogos(updated);
    localStorage.setItem('clientLogos', JSON.stringify(updated));
    toast.success('Logo reordered');
  };

  const dashboardStats = [
    { label: 'Registered Clients', value: clients.length.toString(), icon: Users, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { label: 'Testimonials', value: testimonials.length.toString(), icon: Quote, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
    { label: 'Client Logos', value: clientLogos.length.toString(), icon: ImageIcon, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
    { label: 'Verified Clients', value: clients.filter(c => c.verified).length.toString(), icon: CheckCircle2, color: 'text-green-500', bgColor: 'bg-green-500/10' }
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
              <CardTitle className="text-3xl">Admin Panel Login</CardTitle>
              <CardDescription>
                Fixed admin access for info@devstudioco.com
              </CardDescription>
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
                    placeholder="info@devstudioco.com"
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
                    placeholder="Enter password"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <LogIn className="mr-2 w-4 h-4" />
                  Sign In to Admin Panel
                </Button>

                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-xs text-center text-muted-foreground">
                    <strong className="text-foreground">Admin Credentials:</strong><br/>
                    Email: info@devstudioco.com<br/>
                    Password: 12345
                  </p>
                </div>
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
              <p className="text-muted-foreground">Logged in as: {ADMIN_EMAIL}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <Settings className="mr-2 w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card>
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
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-3">
            <TabsTrigger value="clients">
              <Users className="w-4 h-4 mr-2" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="testimonials">
              <Quote className="w-4 h-4 mr-2" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="logos">
              <ImageIcon className="w-4 h-4 mr-2" />
              Client Logos
            </TabsTrigger>
          </TabsList>

          {/* Clients Tab */}
          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>Registered Clients</CardTitle>
                <CardDescription>
                  View and manage all registered client accounts with OTP verification status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Registered</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clients.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                            No registered clients yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        clients.map((client) => (
                          <TableRow key={client.id}>
                            <TableCell>{client.fullName}</TableCell>
                            <TableCell>{client.companyName}</TableCell>
                            <TableCell>{client.email}</TableCell>
                            <TableCell>
                              {new Date(client.registeredAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {client.verified ? (
                                <Badge className="bg-green-500">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge variant="secondary">
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Pending
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Testimonial</CardTitle>
                  <CardDescription>
                    Create a new client testimonial to display on the website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Client Name *</Label>
                      <Input
                        placeholder="John Doe"
                        value={newTestimonial.name}
                        onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Designation</Label>
                      <Input
                        placeholder="CEO"
                        value={newTestimonial.designation}
                        onChange={(e) => setNewTestimonial({...newTestimonial, designation: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company *</Label>
                      <Input
                        placeholder="Company Name"
                        value={newTestimonial.company}
                        onChange={(e) => setNewTestimonial({...newTestimonial, company: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Profile Image URL</Label>
                      <Input
                        placeholder="https://example.com/image.jpg (optional)"
                        value={newTestimonial.image}
                        onChange={(e) => setNewTestimonial({...newTestimonial, image: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Quote/Testimonial *</Label>
                      <Textarea
                        placeholder="Enter the client's testimonial..."
                        rows={3}
                        value={newTestimonial.quote}
                        onChange={(e) => setNewTestimonial({...newTestimonial, quote: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleAddTestimonial}
                    className="mt-4 bg-primary hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Testimonial
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Manage Testimonials ({testimonials.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testimonials.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        No testimonials yet. Add one above!
                      </p>
                    ) : (
                      testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="border-2">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <Quote className="w-6 h-6 text-primary" />
                              </div>
                              <div className="flex-grow">
                                <h4 className="mb-1">{testimonial.name}</h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {testimonial.designation} at {testimonial.company}
                                </p>
                                <p className="text-sm italic mb-3">"{testimonial.quote}"</p>
                              </div>
                              <div className="flex gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => setEditingTestimonial(testimonial)}
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Edit Testimonial</DialogTitle>
                                      <DialogDescription>
                                        Update the testimonial details
                                      </DialogDescription>
                                    </DialogHeader>
                                    {editingTestimonial && (
                                      <div className="space-y-4">
                                        <div className="space-y-2">
                                          <Label>Name</Label>
                                          <Input
                                            value={editingTestimonial.name}
                                            onChange={(e) => setEditingTestimonial({...editingTestimonial, name: e.target.value})}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label>Designation</Label>
                                          <Input
                                            value={editingTestimonial.designation}
                                            onChange={(e) => setEditingTestimonial({...editingTestimonial, designation: e.target.value})}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label>Company</Label>
                                          <Input
                                            value={editingTestimonial.company}
                                            onChange={(e) => setEditingTestimonial({...editingTestimonial, company: e.target.value})}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label>Quote</Label>
                                          <Textarea
                                            value={editingTestimonial.quote}
                                            onChange={(e) => setEditingTestimonial({...editingTestimonial, quote: e.target.value})}
                                            rows={3}
                                          />
                                        </div>
                                        <Button
                                          onClick={handleUpdateTestimonial}
                                          className="w-full bg-primary hover:bg-primary/90"
                                        >
                                          Update Testimonial
                                        </Button>
                                      </div>
                                    )}
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => {
                                    if (confirm('Delete this testimonial?')) {
                                      handleDeleteTestimonial(testimonial.id);
                                    }
                                  }}
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Client Logos Tab */}
          <TabsContent value="logos">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Client Logo</CardTitle>
                  <CardDescription>
                    Add a client logo to display in the scrolling logo section
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company Name *</Label>
                      <Input
                        placeholder="Company Name"
                        value={newLogo.name}
                        onChange={(e) => setNewLogo({...newLogo, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Logo Image URL</Label>
                      <Input
                        placeholder="https://example.com/logo.png (optional)"
                        value={newLogo.imageUrl}
                        onChange={(e) => setNewLogo({...newLogo, imageUrl: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleAddLogo}
                    className="mt-4 bg-primary hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Logo
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Manage Client Logos ({clientLogos.length})</CardTitle>
                  <CardDescription>
                    Reorder or remove logos. Drag to reorder the display sequence.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {clientLogos.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        No client logos yet. Add one above!
                      </p>
                    ) : (
                      clientLogos.map((logo, index) => (
                        <Card key={logo.id} className="border-2">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="flex flex-col gap-1">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => handleReorderLogo(logo.id, 'up')}
                                  disabled={index === 0}
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => handleReorderLogo(logo.id, 'down')}
                                  disabled={index === clientLogos.length - 1}
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </Button>
                              </div>
                              <div className="w-16 h-16 bg-secondary rounded flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                              </div>
                              <div className="flex-grow">
                                <h4 className="mb-1">{logo.name}</h4>
                                <p className="text-sm text-muted-foreground">Order: {logo.order}</p>
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  if (confirm('Delete this logo?')) {
                                    handleDeleteLogo(logo.id);
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
