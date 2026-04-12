import { Facebook, Instagram, Mail, Phone } from 'lucide-react';
import type { SiteContent } from '../site-content';

const quickLinkHrefs = ['#what', '#gallery', '#packages', '#contact'];

export function Footer({
  content,
  headerNavLabels,
}: {
  content: SiteContent['footer'];
  headerNavLabels: string[];
}) {
  const quickLinks = quickLinkHrefs.map((href, index) => ({
    href,
    label: headerNavLabels[index + 1] || '',
  }));

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl !font-bold mb-4">
              {content.brand_text}<span className="text-cyan-400">{content.brand_accent}</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="!font-semibold text-lg mb-4">{content.quick_links_title}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="!font-semibold text-lg mb-4">{content.contact_title}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-cyan-400" />
                {content.phone}
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-cyan-400" />
                {content.email}
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="!font-semibold text-lg mb-4">{content.social_title}</h4>
            <div className="flex gap-4">
              <a
                href={content.facebook_url || '#'}
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-cyan-500 transition-all"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={content.instagram_url || '#'}
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-cyan-500 transition-all"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {content.brand_text}{content.brand_accent}. {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
