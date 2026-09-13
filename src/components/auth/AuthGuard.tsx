'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'client';
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      const role = localStorage.getItem('user_role') as 'admin' | 'client' | null;
      
      if (token && role) {
        setIsAuthenticated(true);
        setUserRole(role);
        
        if (requiredRole && role !== requiredRole) {
          router.push(role === 'admin' ? '/client-portal' : '/admin');
          return;
        }
      } else {
        const redirectUrl = requiredRole === 'admin' ? '/admin/login' : '/client-portal/login';
        router.push(redirectUrl);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router, requiredRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}