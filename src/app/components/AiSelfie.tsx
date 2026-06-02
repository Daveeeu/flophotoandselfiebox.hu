import { Sparkles } from 'lucide-react';
import type { SiteContent } from '../site-content';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AiSelfie({ content }: { content: SiteContent['ai_selfie'] }) {
  const charactersWithImages = content.characters.filter((character) => character.image_url || character.image_path);

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-cyan-50/30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-cyan-700 text-sm !font-semibold">
            <Sparkles className="w-4 h-4" />
            {content.title}
          </div>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl !font-bold text-gray-900">
            {content.lead}
          </h2>
        </div>

        <div className={`max-w-6xl mx-auto grid gap-10 ${charactersWithImages.length > 0 ? 'lg:grid-cols-[1.1fr_0.9fr]' : ''}`}>
          <div className="backdrop-blur-xl bg-white/70 border-2 border-white/60 shadow-xl rounded-3xl p-8 lg:p-10">
            <h3 className="text-2xl !font-bold text-gray-900 mb-4">{content.how_title}</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {content.how_paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-cyan-200/60 bg-cyan-50/60 p-6">
              <p className="text-sm sm:text-base text-cyan-900 !font-semibold">
                {content.price_note}
              </p>
            </div>
          </div>

          {charactersWithImages.length > 0 ? (
            <div className="backdrop-blur-xl bg-white/70 border-2 border-white/60 shadow-xl rounded-3xl p-8 lg:p-10">
              <h3 className="text-2xl !font-bold text-gray-900 mb-2">{content.characters_title}</h3>
              <p className="text-sm text-gray-600 mb-6">{content.characters_note}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {charactersWithImages.map((character, index) => (
                  <div
                    key={`${character.label}-${index}`}
                    className="rounded-2xl overflow-hidden border border-white/60 bg-white shadow-sm"
                  >
                    <div className="aspect-square bg-gray-100">
                      <ImageWithFallback
                        src={character.image_url || character.image_path}
                        alt={character.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="px-3 py-3">
                      <p className="text-xs sm:text-sm !font-semibold text-gray-900 text-center">
                        {character.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
