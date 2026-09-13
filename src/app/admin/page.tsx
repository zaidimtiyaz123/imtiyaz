'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';
import AdminPanelContent from './AdminPanelContent';

export default function AdminPanelPage() {
  return (
    <AuthGuard requiredRole="admin">
      <AdminPanelContent />
    </AuthGuard>
  );
}