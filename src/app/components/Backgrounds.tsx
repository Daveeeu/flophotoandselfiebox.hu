import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import type { SiteContent } from '../site-content';

export function Backgrounds({ content }: { content: SiteContent['backgrounds'] }) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'previous' | 'next') => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const scrollAmount = slider.clientWidth * 0.85;
    slider.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

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

        <div className="relative mt-12">
          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {content.items.map((bg, index) => (
              <div
                key={index}
                className="min-w-[82%] snap-start sm:min-w-[58%] md:min-w-[45%] lg:min-w-[32%] xl:min-w-[24%]"
              >
                <div className="group">
                  <div className="relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl">
                    <ImageWithFallback
                      src={bg.image_url || bg.image_path}
                      alt={bg.label}
                      className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-96 lg:h-[28rem]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                    <p className="absolute bottom-0 left-0 right-0 px-5 py-5 text-center text-lg !font-semibold text-white">
                      {bg.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            aria-label="Előző háttér"
            onClick={() => scrollSlider('previous')}
            className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg border border-white/70 bg-white/90 text-2xl leading-none text-gray-900 shadow-lg transition hover:bg-white md:flex lg:-left-4"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Következő háttér"
            onClick={() => scrollSlider('next')}
            className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg border border-white/70 bg-white/90 text-2xl leading-none text-gray-900 shadow-lg transition hover:bg-white md:flex lg:-right-4"
          >
            ›
          </button>
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
