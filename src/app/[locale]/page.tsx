import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';
import { Fish, Truck, Factory, Sparkles, Award, Globe } from 'lucide-react';

export default async function HomePage() {
  const t = await getTranslations('home');
  const tProducts = await getTranslations('products');

  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    take: 3,
  });

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with animated background */}
      <section className="relative min-h-[600px] md:h-[700px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Wave effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 md:h-32" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" fillOpacity="0.1"/>
            <path d="M0 40L60 46.7C120 53 240 67 360 73.3C480 80 600 80 720 73.3C840 67 960 53 1080 46.7C1200 40 1320 40 1380 40H1440V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V40Z" fill="white" fillOpacity="0.05"/>
            <path d="M0 80L60 76.7C120 73 240 67 360 66.7C480 67 600 73 720 76.7C840 80 960 80 1080 76.7C1200 73 1320 67 1380 63.3L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V80Z" fill="white"/>
          </svg>
        </div>

        <div className="container mx-auto px-4 h-full flex items-center py-12 md:py-0 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium">{t('badgeExcellence')}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 animate-slide-up">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                {t('title')}
              </span>
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-blue-50 animate-slide-up animation-delay-200">{t('subtitle')}</p>
            <div className="flex flex-wrap gap-4 animate-slide-up animation-delay-400">
              <Link href="/products">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                  {t('cta')}
                  <Fish className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/request-quote">
                <Button size="lg" className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-blue-700 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-105 font-semibold">
                  {t('ctaQuote')}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 animate-fade-in animation-delay-600">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">50+</div>
                <div className="text-sm text-blue-200">{t('statsProducts')}</div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-3xl md:text-4xl font-bold mb-1">100%</div>
                <div className="text-sm text-blue-200">{t('statsQuality')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">24/7</div>
                <div className="text-sm text-blue-200">{t('statsSupport')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-4">
              <Award className="h-4 w-4" />
              {t('badgePremium')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t('featuredProducts')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('featuredSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  image={product.image}
                  stock={product.stock}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-medium mb-4">
              <Globe className="h-4 w-4" />
              {t('badgeGlobal')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t('whyChooseUs')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-none bg-gradient-to-br from-white to-blue-50/30 backdrop-blur">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500"></div>
                  <Fish className="h-16 w-16 mx-auto text-blue-600 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{t('quality')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('qualityDesc')}</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-none bg-gradient-to-br from-white to-indigo-50/30 backdrop-blur">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500"></div>
                  <Truck className="h-16 w-16 mx-auto text-indigo-600 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{t('logistics')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('logisticsDesc')}</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-none bg-gradient-to-br from-white to-purple-50/30 backdrop-blur">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500"></div>
                  <Factory className="h-16 w-16 mx-auto text-purple-600 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{t('factory')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('factoryDesc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
