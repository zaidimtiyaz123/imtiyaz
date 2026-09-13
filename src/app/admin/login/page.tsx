'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { useLanguage } from '@/context/LanguageContext';
import { companyInfo } from '@/data';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const DEMO_CREDENTIALS = {
  admin: { email: 'admin@creatoroftechnology.com', password: 'admin123', name: 'Admin User', role: 'admin' as const },
  client: { email: 'client@example.com', password: 'client123', name: 'John Doe', role: 'client' as const },
};

export default function AdminLoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let user = null;
      if (data.email === DEMO_CREDENTIALS.admin.email && data.password === DEMO_CREDENTIALS.admin.password) {
        user = DEMO_CREDENTIALS.admin;
      } else if (data.email === DEMO_CREDENTIALS.client.email && data.password === DEMO_CREDENTIALS.client.password) {
        user = DEMO_CREDENTIALS.client;
      }
      
      if (!user || user.role !== 'admin') {
        toast.error('Invalid admin credentials');
        setIsLoading(false);
        return;
      }
      
      const token = 'demo-admin-token-' + Date.now();
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_role', 'admin');
      localStorage.setItem('user_name', user.name);
      localStorage.setItem('user_email', user.email);
      
      toast.success('Welcome back, Admin!');
      router.push('/admin');
    } catch {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-heading font-bold text-gray-900 dark:text-white">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
              <span className="text-white font-heading font-bold text-sm">CT</span>
            </div>
            <span>{companyInfo.name}</span>
          </Link>
          <h2 className="mt-6 text-3xl font-heading font-bold text-gray-900 dark:text-white">Admin Login</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to access the admin panel</p>
        </div>

        <Card variant="bordered" padding="xl">
          <CardHeader className="text-center">
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>Enter your credentials to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                placeholder="admin@creatoroftechnology.com"
                error={errors.email?.message}
                icon={<Mail className="w-5 h-5" />}
                {...register('email')}
                autoComplete="email"
                disabled={isLoading}
              />

              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-12 py-3 rounded-lg border bg-white px-4 text-sm placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-primary-400 transition-colors duration-200"
                    placeholder="••••••••"
                    {...register('password')}
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-sm text-red-500" role="alert">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    {...register('remember')}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <Link href="#" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">Demo Credentials</p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-sm">
                <p className="font-medium text-gray-900 dark:text-white mb-2">Admin:</p>
                <p className="text-gray-600 dark:text-gray-400 font-mono text-xs mb-1">admin@creatoroftechnology.com</p>
                <p className="text-gray-600 dark:text-gray-400 font-mono text-xs">admin123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          <Link href="/client-portal/login" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
            Client Portal Login
          </Link>
        </p>
      </div>
    </div>
  );
}