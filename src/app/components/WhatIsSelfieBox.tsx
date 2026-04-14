import { Camera, Zap, Share2, Sparkles } from 'lucide-react';
import type { SiteContent } from '../site-content';

const icons = [Sparkles, Camera, Share2, Zap];

export function WhatIsSelfieBox({ content }: { content: SiteContent['what'] }) {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl !font-bold text-gray-900 mb-6">
            {content.title}
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.paragraph_1}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.paragraph_2}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {content.features.map((feature, index) => {
            const Icon = icons[index] || Sparkles;
            return (
              <div
                key={index}
                className="backdrop-blur-sm bg-gradient-to-br from-gray-50/80 to-white/80 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-white/50 text-center"
              >
                <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Icon className="w-7 h-7 text-cyan-600" />
                </div>
                <h3 className="text-xl !font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
