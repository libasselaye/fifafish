'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Fish, Home } from 'lucide-react';

type Locale = 'en' | 'fr' | 'es' | 'zh';

const translations = {
  en: {
    backToHome: 'Back to Home',
    login: 'Login',
    email: 'Email',
    password: 'Password',
    loggingIn: 'Logging in...',
    adminLogin: 'Admin Login',
  },
  fr: {
    backToHome: 'Retour à l\'accueil',
    login: 'Connexion',
    email: 'Email',
    password: 'Mot de passe',
    loggingIn: 'Connexion en cours...',
    adminLogin: 'Connexion Admin',
  },
  es: {
    backToHome: 'Volver al inicio',
    login: 'Iniciar sesión',
    email: 'Correo electrónico',
    password: 'Contraseña',
    loggingIn: 'Iniciando sesión...',
    adminLogin: 'Inicio de sesión de administrador',
  },
  zh: {
    backToHome: '返回首页',
    login: '登录',
    email: '邮箱',
    password: '密码',
    loggingIn: '登录中...',
    adminLogin: '管理员登录',
  },
};

export default function AdminLoginWrapper() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    // Détecter la locale depuis les cookies ou le navigateur
    const detectLocale = () => {
      // Essayer de lire le cookie NEXT_LOCALE
      const cookies = document.cookie.split(';');
      const localeCookie = cookies.find(c => c.trim().startsWith('NEXT_LOCALE='));

      if (localeCookie) {
        const cookieLocale = localeCookie.split('=')[1] as Locale;
        if (cookieLocale in translations) {
          setLocale(cookieLocale);
          return;
        }
      }

      // Fallback sur la langue du navigateur
      const browserLang = navigator.language.split('-')[0] as Locale;
      if (browserLang in translations) {
        setLocale(browserLang);
      }
    };

    detectLocale();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple authentication check
    if (email === 'admin@fifafish.com' && password === 'Admin123!') {
      localStorage.setItem('admin_logged_in', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  const t = translations[locale];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Fish className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">{t.adminLogin}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t.loggingIn : t.login}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link href={`/${locale}`}>
              <Button variant="outline" className="w-full">
                <Home className="h-4 w-4 mr-2" />
                {t.backToHome}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
