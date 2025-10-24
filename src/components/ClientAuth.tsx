import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Building, Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { toast } from 'sonner@2.0.3';

interface ClientAuthProps {
  onSuccess: () => void;
  onBack: () => void;
}

export function ClientAuth({ onSuccess, onBack }: ClientAuthProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'otp' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.companyName || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    // Simulate sending OTP
    setTimeout(() => {
      // Store registration data in localStorage
      const clients = JSON.parse(localStorage.getItem('registeredClients') || '[]');
      const newClient = {
        id: Date.now(),
        fullName: formData.fullName,
        companyName: formData.companyName,
        email: formData.email,
        password: formData.password,
        verified: false,
        registeredAt: new Date().toISOString()
      };
      
      // Check if email already exists
      if (clients.some((c: any) => c.email === formData.email)) {
        toast.error('Email already registered');
        setLoading(false);
        return;
      }

      clients.push(newClient);
      localStorage.setItem('registeredClients', JSON.stringify(clients));
      localStorage.setItem('pendingVerification', JSON.stringify(newClient));

      setLoading(false);
      setMode('otp');
      toast.success(`OTP sent to ${formData.email}`);
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);

    // Check credentials
    setTimeout(() => {
      const clients = JSON.parse(localStorage.getItem('registeredClients') || '[]');
      const client = clients.find((c: any) => c.email === formData.email && c.password === formData.password);

      if (!client) {
        toast.error('Invalid credentials');
        setLoading(false);
        return;
      }

      if (!client.verified) {
        toast.error('Please verify your account first');
        setLoading(false);
        return;
      }

      localStorage.setItem('pendingLogin', JSON.stringify(client));
      setLoading(false);
      setMode('otp');
      toast.success(`OTP sent to ${formData.email}`);
    }, 1500);
  };

  const handleOTPVerify = () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      // In real app, verify OTP with backend
      const isRegistration = localStorage.getItem('pendingVerification');
      const isLogin = localStorage.getItem('pendingLogin');

      if (isRegistration) {
        // Complete registration
        const client = JSON.parse(isRegistration);
        const clients = JSON.parse(localStorage.getItem('registeredClients') || '[]');
        const updatedClients = clients.map((c: any) => 
          c.email === client.email ? { ...c, verified: true } : c
        );
        localStorage.setItem('registeredClients', JSON.stringify(updatedClients));
        localStorage.removeItem('pendingVerification');
        localStorage.setItem('currentClient', JSON.stringify({ ...client, verified: true }));
        
        toast.success('Account verified successfully!');
        setLoading(false);
        onSuccess();
      } else if (isLogin) {
        // Complete login
        const client = JSON.parse(isLogin);
        localStorage.setItem('currentClient', JSON.stringify(client));
        localStorage.removeItem('pendingLogin');
        
        toast.success('Login successful!');
        setLoading(false);
        onSuccess();
      }
    }, 1500);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      toast.success('Password reset link sent to your email');
      setLoading(false);
      setMode('login');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {/* Login Form */}
          {mode === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-2">
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onBack}
                      className="rounded-full"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="text-2xl text-primary">●</div>
                  </div>
                  <CardTitle className="text-3xl">Welcome Back</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={loading}
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setMode('register')}
                        className="text-primary hover:underline"
                      >
                        Register here
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Registration Form */}
          {mode === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-2">
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onBack}
                      className="rounded-full"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="text-2xl text-primary">●</div>
                  </div>
                  <CardTitle className="text-3xl">Create Account</CardTitle>
                  <CardDescription>
                    Join us to access exclusive client features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="John Doe"
                          className="pl-10"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="companyName"
                          name="companyName"
                          type="text"
                          placeholder="Your Company"
                          className="pl-10"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a password"
                          className="pl-10 pr-10"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          className="pl-10 pr-10"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={loading}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setMode('login')}
                        className="text-primary hover:underline"
                      >
                        Sign in here
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* OTP Verification */}
          {mode === 'otp' && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-2">
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl">Verify Your Email</CardTitle>
                  <CardDescription>
                    We've sent a 6-digit code to {formData.email}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="otp" className="text-center block">Enter OTP Code</Label>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => setOtp(value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>

                  <Button
                    onClick={handleOTPVerify}
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Didn't receive the code?{' '}
                    <button
                      type="button"
                      onClick={() => toast.success('OTP resent successfully')}
                      className="text-primary hover:underline"
                    >
                      Resend OTP
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Forgot Password */}
          {mode === 'forgot' && (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-2">
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMode('login')}
                      className="rounded-full"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="text-2xl text-primary">●</div>
                  </div>
                  <CardTitle className="text-3xl">Reset Password</CardTitle>
                  <CardDescription>
                    Enter your email to receive a password reset link
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                      Remember your password?{' '}
                      <button
                        type="button"
                        onClick={() => setMode('login')}
                        className="text-primary hover:underline"
                      >
                        Sign in here
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
