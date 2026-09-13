'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';
import ClientPortalContent from './ClientPortalContent';

export default function ClientPortalPage() {
  return (
    <AuthGuard requiredRole="client">
      <ClientPortalContent />
    </AuthGuard>
  );
}