import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { SiteContent } from '../site-content';

type GalleryImage = {
  image_url: string;
  alt_text?: string | null;
  title: string;
  description?: string | null;
};

export function Gallery({
  content,
  images,
}: {
  content: SiteContent['gallery'];
  images: GalleryImage[];
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl !font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={`${image.title}-${index}`}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <ImageWithFallback
                src={image.image_url}
                alt={image.alt_text || image.title}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-cyan-600/80 via-cyan-500/40 to-transparent transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xl !font-semibold">{image.title}</p>
                  <p className="text-sm opacity-90 mt-1">{image.description || content.fallback_description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
