import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import type { SiteContent } from '../site-content';

const navHrefs = ['#hero', '#what', '#ai-selfie', '#gallery', '#packages', '#booking', '#backgrounds', '#contact'];

export function Header({ content }: { content: SiteContent['header'] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = navHrefs.map((href, index) => ({
    href,
    label: content.nav_labels[index] || '',
  }));

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-white/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="text-2xl !font-bold text-gray-900">
              {content.brand_text}<span className="text-cyan-500">{content.brand_accent}</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-cyan-600 transition-colors !font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 rounded-xl">
              <a href="#booking">
              {content.cta_label}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-cyan-600 transition-colors !font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white w-full mt-4 rounded-xl">
                <a href="#booking">
                {content.cta_label}
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
