import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, User, Shield, Eye, EyeOff } from 'lucide-react';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = login(email, password, role);
    if (success) {
      toast.success('Welcome back!', {
        description: `Logged in as ${role}`,
      });
      navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } else {
      toast.error('Login failed', {
        description: 'Invalid credentials. Try the demo accounts below.',
      });
    }
    setIsLoading(false);
  };

  const fillDemoCredentials = (demoRole: UserRole) => {
    setRole(demoRole);
    setEmail(demoRole === 'admin' ? 'admin@hostel.com' : 'student@hostel.com');
    setPassword('password');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.08%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-primary-foreground">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
              <Building className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold">HostelHub</h1>
              <p className="text-primary-foreground/70">Smart Hostel Management</p>
            </div>
          </div>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-md leading-relaxed">
            Streamline your hostel operations with intelligent room management, 
            attendance tracking, and maintenance solutions.
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
              <p className="text-2xl font-bold">500+</p>
              <p className="text-sm text-primary-foreground/70">Students Managed</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-primary-foreground/70">Issue Resolution</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Building className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold">HostelHub</h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          {/* Role Selection */}
          <div className="flex gap-3 mb-6">
            {[
              { value: 'student' as UserRole, icon: User, label: 'Student' },
              { value: 'admin' as UserRole, icon: Shield, label: 'Admin' },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setRole(item.value)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                  role === item.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/50 hover:bg-secondary"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="xl"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-secondary rounded-xl">
            <p className="text-sm text-muted-foreground mb-3 text-center font-medium">
              Quick Demo Access
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => fillDemoCredentials('student')}
              >
                <User className="w-4 h-4 mr-2" />
                Student
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => fillDemoCredentials('admin')}
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
