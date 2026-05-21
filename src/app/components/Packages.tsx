import { Check } from 'lucide-react';
import { Button } from './ui/button';
import type { SiteContent } from '../site-content';

function parseHungarianForintAmount(value: string): number | null {
  const normalized = value.replace(/\s/g, '').replace(/\./g, '').replace(/Ft/i, '').trim();
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : null;
}

function formatHungarianForintAmount(amount: number): string {
  return `${Math.round(amount).toLocaleString('hu-HU')} Ft`;
}

function withAiSurcharge(price: string): string {
  const baseAmount = parseHungarianForintAmount(price);
  if (baseAmount === null) {
    return `${price} (+30%)`;
  }
  return formatHungarianForintAmount(baseAmount * 1.3);
}

export function Packages({ content }: { content: SiteContent['packages'] }) {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background gradient for glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-cyan-50/30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl !font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Top 3 Packages */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
          {content.items.map((pkg, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                pkg.highlighted
                  ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-2xl scale-105 lg:scale-110'
                  : 'backdrop-blur-xl bg-white/70 border-2 border-white/60 shadow-xl hover:shadow-2xl hover:border-cyan-300/50'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-6 py-1.5 rounded-full text-sm !font-semibold">
                  {content.highlight_badge}
                </div>
              )}

              <div className="text-center mb-6">
                <h3
                  className={`text-2xl !font-bold mb-2 ${
                    pkg.highlighted ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`text-sm ${
                    pkg.highlighted ? 'text-cyan-100' : 'text-gray-600'
                  }`}
                >
                  {pkg.duration}
                </p>
              </div>

              <div className="text-center mb-8">
                <div
                  className={`text-4xl !font-bold ${
                    pkg.highlighted ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {pkg.price}
                </div>
                <p className={`mt-2 text-sm ${pkg.highlighted ? 'text-cyan-100' : 'text-gray-600'}`}>
                  AI Selfie: {withAiSurcharge(pkg.price)}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        pkg.highlighted ? 'text-cyan-100' : 'text-cyan-500'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        pkg.highlighted ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-6 rounded-xl !font-semibold transition-all ${
                  pkg.highlighted
                    ? 'bg-white text-cyan-600 hover:bg-gray-100'
                    : 'bg-cyan-500 text-white hover:bg-cyan-600'
                }`}
              >
                {pkg.cta_label}
              </Button>
            </div>
          ))}
        </div>

        {/* Digital Package Below */}
        <div className="max-w-md mx-auto">
          <div className="relative rounded-3xl p-8 backdrop-blur-xl bg-white/70 border-2 border-white/60 shadow-xl hover:shadow-2xl hover:border-cyan-300/50 transition-all duration-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl !font-bold mb-2 text-gray-900">
                {content.digital.name}
              </h3>
              <p className="text-sm text-cyan-600 !font-medium">
                {content.digital.note}
              </p>
            </div>

            <div className="text-center mb-8">
              <div className="text-4xl !font-bold text-gray-900">
                {content.digital.price}
              </div>
              <p className="text-sm mt-1 text-gray-500">
                / {content.digital.duration}
              </p>
              <p className="text-sm mt-2 text-gray-600">
                AI Selfie: {withAiSurcharge(content.digital.price)}
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              {content.digital.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-cyan-500" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full py-6 rounded-xl !font-semibold transition-all bg-cyan-500 text-white hover:bg-cyan-600">
              {content.digital.cta_label}
            </Button>
          </div>
        </div>

        {/* Custom Request Note */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            {content.custom_note}
          </p>
        </div>
      </div>
    </section>
  );
}
