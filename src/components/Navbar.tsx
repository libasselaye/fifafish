'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { LanguageSwitch } from './LanguageSwitch';
import { Fish, Menu, X, Sparkles } from 'lucide-react';

export function Navbar() {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200/50'
        : 'bg-white/70 backdrop-blur-md border-b border-white/20'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with animation */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              <Fish className="h-8 w-8 text-blue-600 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              FifaFish
            </span>
            <Sparkles className="h-4 w-4 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 group">
              {t('home')}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/products" className="relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 group">
              {t('products')}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/factory" className="relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 group">
              {t('factory')}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/logistics" className="relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 group">
              {t('logistics')}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/request-quote" className="ml-4">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                {t('requestQuote')}
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button variant="outline" className="border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                Admin
              </Button>
            </Link>
            <div className="ml-2">
              <LanguageSwitch />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitch />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu with slide animation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="border-t border-gray-200/50 bg-gradient-to-b from-white/95 to-white/80 backdrop-blur-lg">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Link
                href="/"
                className="block py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link
                href="/products"
                className="block py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('products')}
              </Link>
              <Link
                href="/factory"
                className="block py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('factory')}
              </Link>
              <Link
                href="/logistics"
                className="block py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('logistics')}
              </Link>
              <Link
                href="/request-quote"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md">
                  {t('requestQuote')}
                </Button>
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="outline" className="w-full border-gray-300">
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
