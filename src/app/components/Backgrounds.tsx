import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import type { SiteContent } from '../site-content';

export function Backgrounds({ content }: { content: SiteContent['backgrounds'] }) {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl !font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mt-12">
          {content.items.map((bg, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                <ImageWithFallback
                  src={bg.image_url || bg.image_path}
                  alt={bg.label}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <p className="text-center mt-3 text-sm !font-medium text-gray-700 group-hover:text-cyan-600 transition-colors">
                {bg.label}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-700 mb-4 text-lg">
            {content.cta_text}
          </p>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 rounded-xl !font-semibold">
            {content.cta_button_label}
          </Button>
        </div>
      </div>
    </section>
  );
}
