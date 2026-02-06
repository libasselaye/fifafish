'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    router.push('/admin/login');
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className="w-full justify-start text-white hover:bg-gray-800"
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Déconnexion
    </Button>
  );
}
