'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Fish, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
}

export function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const currentImage = images?.[selectedIndex];

  const goTo = (index: number) => {
    if (index >= 0 && index < images.length) {
      setSelectedIndex(index);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="relative h-96 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 flex items-center justify-center">
        <Fish className="w-24 h-24 text-blue-400 opacity-50" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative h-96 rounded-lg overflow-hidden bg-gray-100 group">
        {currentImage && !imageErrors[selectedIndex] ? (
          <Image
            src={currentImage}
            alt={`${alt} - ${selectedIndex + 1}`}
            fill
            className="object-cover"
            onError={() => setImageErrors((prev) => ({ ...prev, [selectedIndex]: true }))}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200">
            <Fish className="w-24 h-24 text-blue-400 opacity-50" />
          </div>
        )}

        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-lg"
              onClick={() => goTo(selectedIndex - 1)}
              disabled={selectedIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-lg"
              onClick={() => goTo(selectedIndex + 1)}
              disabled={selectedIndex === images.length - 1}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
              {selectedIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                index === selectedIndex
                  ? 'border-blue-600 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              {!imageErrors[index] ? (
                <Image
                  src={img}
                  alt={`${alt} - miniature ${index + 1}`}
                  fill
                  className="object-cover"
                  onError={() => setImageErrors((prev) => ({ ...prev, [index]: true }))}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-100">
                  <Fish className="w-6 h-6 text-blue-400" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
