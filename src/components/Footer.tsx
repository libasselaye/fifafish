'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Fish, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Fish className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">FifaFish</span>
            </div>
            <p className="text-gray-400">{t('aboutText')}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks')}</h3>
            <div className="space-y-2">
              <Link href="/" className="block hover:text-blue-400 transition">
                {tNav('home')}
              </Link>
              <Link href="/products" className="block hover:text-blue-400 transition">
                {tNav('products')}
              </Link>
              <Link href="/factory" className="block hover:text-blue-400 transition">
                {tNav('factory')}
              </Link>
              <Link href="/logistics" className="block hover:text-blue-400 transition">
                {tNav('logistics')}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-gray-400">contact@fifafish.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-gray-400">+221 33 XXX XX XX</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-gray-400">Dakar, Senegal</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('about')}</h3>
            <p className="text-gray-400 text-sm">{t('aboutText')}</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FifaFish. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
