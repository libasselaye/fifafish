'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FileText, Package, Home } from 'lucide-react';
import { AdminLogoutButton } from '@/components/AdminLogoutButton';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
      setIsAuthenticated(isLoggedIn);
      setIsLoading(false);

      // Rediriger vers login si non authentifié et pas déjà sur la page de login
      if (!isLoggedIn && !isLoginPage) {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [isLoginPage, router]);

  // Si on est sur la page de login, afficher uniquement le contenu
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Afficher un loader pendant la vérification
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Ne pas afficher le contenu protégé si pas authentifié
  if (!isAuthenticated) {
    return null;
  }

  // Sinon, afficher le layout complet avec sidebar
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">FifaFish Admin</h2>
          <p className="text-sm text-gray-400">admin@fifafish.com</p>
        </div>

        <nav className="space-y-2">
          <Link href="/en">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              <Home className="h-4 w-4 mr-2" />
              Retour au site
            </Button>
          </Link>
          <Link href="/admin/dashboard">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Tableau de Bord
            </Button>
          </Link>
          <Link href="/admin/quotes">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              <FileText className="h-4 w-4 mr-2" />
              Devis
            </Button>
          </Link>
          <Link href="/admin/products">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              <Package className="h-4 w-4 mr-2" />
              Produits
            </Button>
          </Link>
          <AdminLogoutButton />
        </nav>
      </aside>

      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}
