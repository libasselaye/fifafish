export const dynamic = 'force-dynamic';

import { getTranslations } from 'next-intl/server';
import { ProductCard } from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';
import { Package, Sparkles, Fish } from 'lucide-react';

export default async function ProductsPage() {
  const t = await getTranslations('products');

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Catalogue Premium
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          {products.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">{products.length}</span> produits disponibles
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard
                      id={product.id}
                      nameEn={product.nameEn}
                      nameFr={product.nameFr}
                      category={product.category}
                      price={product.price}
                      images={product.images}
                      stock={product.stock}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
                <Fish className="h-24 w-24 text-blue-400 relative z-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                Aucun produit disponible
              </h3>
              <p className="text-gray-600 mb-6">
                Les produits seront bientôt disponibles
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
