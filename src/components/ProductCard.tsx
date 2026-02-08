'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Fish, ShoppingCart, Eye, Package } from 'lucide-react';

interface ProductCardProps {
  id: string;
  nameEn: string;
  nameFr: string;
  category: string;
  price: number;
  images: string[];
  stock: number;
}

export function ProductCard({ id, nameEn, nameFr, category, price, images, stock }: ProductCardProps) {
  const t = useTranslations('products');
  const locale = useLocale();
  const [imageError, setImageError] = useState(false);

  const name = locale === 'fr' ? nameFr : nameEn;
  const mainImage = images?.[0];

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-none bg-white/80 backdrop-blur-sm hover:-translate-y-2">
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {mainImage && !imageError ? (
          <>
            <Image
              src={mainImage}
              alt={name}
              fill
              loading="lazy"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200">
            <Fish className="w-24 h-24 text-blue-400 opacity-50" />
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {stock > 0 ? (
            <Badge className="bg-green-500/90 backdrop-blur-sm border-green-400/30 flex items-center gap-1 shadow-lg">
              <Package className="h-3 w-3" />
              {stock} {t('stock')}
            </Badge>
          ) : (
            <Badge className="bg-red-500/90 backdrop-blur-sm border-red-400/30 shadow-lg">
              {t('outOfStock')}
            </Badge>
          )}
        </div>

        {images?.length > 1 && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-black/50 backdrop-blur-sm text-white border-none text-xs">
              {images.length} photos
            </Badge>
          </div>
        )}

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link href={`/products/${id}`}>
            <Button
              size="sm"
              className="bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <Eye className="h-4 w-4 mr-2" />
              {t('viewDetails')}
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

        <CardContent className="p-5">
          <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            {category}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ${price}
            </p>
            <span className="text-sm text-gray-500">/ton</span>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0">
          <Link href={`/request-quote?product=${id}`} className="w-full">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 group/btn">
              <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              {t('addToQuote')}
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}
