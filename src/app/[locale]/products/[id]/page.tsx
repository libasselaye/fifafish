export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/prisma';
import { ArrowLeft } from 'lucide-react';
import { ProductImageGallery } from '@/components/ProductImageGallery';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const t = await getTranslations('product');
  const tProducts = await getTranslations('products');

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  const name = locale === 'fr' ? product.nameFr : product.nameEn;
  const description = locale === 'fr' ? product.descriptionFr : product.descriptionEn;

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <Link href="/products" className="inline-flex items-center text-blue-600 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('backToProducts')}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ProductImageGallery images={product.images} alt={name} />

          <div>
            <h1 className="text-4xl font-bold mb-4">{name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <Badge className="text-lg">{product.category}</Badge>
              {product.stock > 0 ? (
                <Badge className="bg-green-500 text-lg">{tProducts('stock')}</Badge>
              ) : (
                <Badge className="bg-red-500 text-lg">{tProducts('outOfStock')}</Badge>
              )}
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-6">
              ${product.price}/ton
            </p>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t('description')}</h2>
                <p className="text-gray-600 whitespace-pre-line">{description}</p>
              </CardContent>
            </Card>

            <Link href={`/request-quote?product=${product.id}`}>
              <Button size="lg" className="w-full">
                {t('requestQuote')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
