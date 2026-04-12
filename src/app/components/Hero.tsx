import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Calendar, MessageCircle } from 'lucide-react';
import type { SiteContent } from '../site-content';

export function Hero({ content }: { content: SiteContent['hero'] }) {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={content.image_url || content.image_path}
          alt={content.image_alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/60 via-black/50 to-cyan-900/40"></div>

      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl z-10"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl z-10"></div>

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-16">
        <div className="flex items-center justify-center">
          {/* Glassmorphism Hero Card */}
          <div className="max-w-4xl w-full backdrop-blur-2xl bg-white/15 rounded-3xl lg:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-white/30 shadow-2xl">
            {/* Main Content */}
            <div className="text-center space-y-8">
              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl !font-black text-white !leading-tight tracking-tight">
                {content.title_prefix}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                  {content.title_highlight}
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                {content.subtitle}
              </p>

              {/* Feature List - First Group */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
                {content.primary_features.map((feature) => (
                  <div key={feature} className="backdrop-blur-md bg-white/10 px-6 py-3 rounded-xl border border-white/20">
                    <p className="text-white/90 text-sm sm:text-base !font-medium">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              {/* Feature List - Second Group */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                {content.secondary_features.map((feature) => (
                  <div key={feature} className="backdrop-blur-md bg-white/10 px-6 py-3 rounded-xl border border-white/20">
                    <p className="text-white/90 text-sm sm:text-base !font-medium">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6">
                {/* Primary CTA - Booking */}
                <Button
                  asChild
                  size="lg"
                  className="group relative bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-10 py-7 rounded-2xl !font-bold text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  <a href="#booking" className="relative flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    <span>{content.primary_cta_label}</span>
                    <div className="absolute inset-0 rounded-2xl bg-cyan-400/40 blur-xl group-hover:bg-cyan-400/60 transition-all -z-10"></div>
                  </a>
                </Button>

                {/* Secondary CTA - Contact */}
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="backdrop-blur-xl bg-white/20 border-2 border-white/50 text-white hover:bg-white/30 hover:border-white/70 px-10 py-7 rounded-2xl !font-bold text-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  <a href="#contact" className="flex items-center gap-3">
                    <MessageCircle className="w-6 h-6" />
                    {content.secondary_cta_label}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator (optional) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
